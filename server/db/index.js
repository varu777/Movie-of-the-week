require('dotenv').config()
const MovieModel = require('./models/Movie');
const UserModel = require('./models/User');
const StatsModel = require('./models/Stats');
const UpdatesModel = require('./models/Update');

var bcrypt = require('bcrypt');
var ObjectId = require('mongoose').Types.ObjectId;
var mongoUtil = require("../utils/mongoUtil");
const { watch } = require('./models/Movie');
const { database } = require('firebase-admin');
var db = mongoUtil.getDb();


async function suggestMovie(movie, userId, note) {
    const session = await db.startSession();
    const parsedMovie = parseString(movie);
    const formattedMovie = formatString(movie);

    // checking if movie has been added
    const duplicate = await MovieModel.findOne({parsedName: parsedMovie});
    if (duplicate != null) throw new Error("Movie is already inserted.");

    // retrieve user info
    let userResult = await UserModel.findOne({_id: userId});
    if (userResult == null) throw new Error("User not found.");

    // retrieve stats
    let statsResult = await StatsModel.findOne({});
    if (statsResult == null) {
        console.log("unable to retrive stats.");
        throw new Error("Internal server error.");
    }

    // update stats 
    statsResult.totalMovies = statsResult.totalMovies + 1;
    statsResult.totalParticipants = userResult.participating == false ? statsResult.totalParticipants + 1 : statsResult.totalParticipants;

    // update the user's total movie count and unwatched movie count
    userResult.total_movies = userResult.total_movies + 1;
    userResult.unwatched_movies = userResult.unwatched_movies + 1;
    userResult.participating = true;
    userResult.suggestion = userResult.suggestion === "" ? formattedMovie : userResult.suggestion;


    // create new object for movies collection
    const added_movie = new MovieModel({
        parsedName: parsedMovie,
        name: formattedMovie, 
        idx: statsResult.totalMovies, 
        addedBy: userId, 
        date: new Date(),
        watched: false,
        note: note
    });

    // complete all updates
    await session.withTransaction(() => {
        return Promise.all([statsResult.save(), userResult.save(), added_movie.save()]);
    });

    return ({movie: formattedMovie, movieIdx: statsResult.totalMovies});
}

async function getHomeData() {
    // movie of the week query
    const movieOTW = await StatsModel.findOne({});

    // find user 
    let currUser= await UserModel.findOne({_id: movieOTW.addedBy});
    currUser = currUser.username;

    // current pool query
    const unselectedUsers = await UserModel.find({participating: true, selected: false}).sort('suggestion');
    var currentPool = [];
    for (user of unselectedUsers) {
        currentPool.push({
            name: user.username, 
            suggestion: user.suggestion
        });
    }

    // watched movies query
    const watchedMovies = await getMovies('recent');

    // retrieve upcoming movies
    const upcomingMovies = await getMovies('upcoming');

    // fetch group updates
    const recentUpdates = await getUpdates(false);

    return {movieOTW, currUser, upcomingMovies, currentPool, watchedMovies, recentUpdates}
}

async function getUpdates(all) {
    // retrieve updates for both unwatched and watched movies (TODO: fetch using start and end index)
    let unwatched = await MovieModel.find({watched:false}).sort({date: -1});
    let watched   = await MovieModel.find({watched:true}).sort({date: -1});

    // merge updates
    let updatesQuery = mergeUpdates(unwatched, watched, all);
    let updates = [];

    // replace user id's with usernames
    for (let i = 0; i < updatesQuery.length; i++) {
        let currentUpdate = updatesQuery[i];

        // find user that added movie
        user = await UserModel.findOne({_id: currentUpdate.addedBy});

        updates.push({
            name: currentUpdate.name,
            addedBy: user.username,
            date: currentUpdate.date,
            watched: currentUpdate.watched
        });
    }

    return updates;
}

// returns list showing recent movie updates. Gets updates using merge sort approach
function mergeUpdates(unwatched, watched, all) {
    if (unwatched.length == 0 && watched.length == 0) {
        return [];
    }

    let limit = all ? Number.MAX_SAFE_INTEGER : 7;
    let accountedFor = 0;
    let uwIdx = 0;
    let wIdx = 0;
    let updates = [];
    while (accountedFor < limit && uwIdx < unwatched.length && wIdx < watched.length) {
        if (unwatched[uwIdx].date < watched[wIdx].date) {
            updates.push(watched[wIdx++]);
        } else {
            updates.push(unwatched[uwIdx++]);
        }

        accountedFor++;
    }

    // add remaining movies of unfinished array to updates list
    let remainder = (wIdx == watched.length) ? unwatched : watched;
    let rIdx      = (wIdx == watched.length) ? uwIdx : wIdx;
    while (accountedFor < limit && rIdx < remainder.length) {
        updates.push(remainder[rIdx++]);
        accountedFor++;
    }

    return updates;
}


async function getMovies(filterBy, user=new ObjectId()){
    // contains final list of movies
    var movies = []

    // determine filter type
    var moviesQuery = [];
    if (filterBy === 'recent') {
        moviesQuery = await MovieModel.find({watched: true}).sort({date: -1});
    } else if (filterBy == 'upcoming') {
        moviesQuery = await MovieModel.find({watched: false}).sort({name: 1});
    } else if (filterBy === 'oldest') {
        moviesQuery = await MovieModel.find({watched: true}).sort({date: 1});
    } else if (filterBy === 'with') {
        moviesQuery = await MovieModel.find({watched: false, addedBy: {$eq: user._id}}).sort({name: 1});
    } else if (filterBy === 'without') {
        moviesQuery = await MovieModel.find({watched: false, addedBy: {$ne: user._id}}).sort({name: 1});
    } else { // sort by movie name
        moviesQuery = await MovieModel.find({watched: true}).sort({name: 1});
    }

    // format date properly
    for (movie of moviesQuery) {
        // find user that added movie
        user = await UserModel.findOne({_id: movie.addedBy});
        user = user.username;

        // format data
        movies.push({
            name: movie.name, 
            teaser: movie.note, 
            addedBy: user, 
            date: movie.date,
            idx: movie.idx
        });
    }

    return movies;
}

async function watchedMovie(selectedMovie) {
    // find movie
    let movie = await MovieModel.findOne({parsedName: parseString(selectedMovie)});

    if (movie == null) 
        return new Error("Movie not found.");

    if (movie.watched) 
        return new Error("Movie already watched.");

    movie.watched = true;
    movie.date = new Date();

    await movie.save();
}

async function resetUsers() {
    // retrieve users that have unwatched movies
    const participants = await MovieModel.find({unwatched_movies: { $gt: 0}});
    
    // update selected status of each one to false
    for (user of participants) {
        user.selected = false;
    }

    // determines size of new pool
    const newPoolSize = participants.length;

    // update stats info for new pool
    let stats = await StatsModel.findOne({});
    stats.selected = 0;
    stats.totalParticipants = newPoolSize;

    // write all updates to database
    await session.withTransaction(() => {
        return Promise.all([participants.save(), stats.save()]);
    });
}

async function chooseMovie() {
    // retrieve stats
    const stats = await StatsModel.findOne({});
    
    // all movies watched error check
    if (stats.watchedMovies == stats.totalMovies) throw new Error("Every movie added has been watched.");

    // zero participants error check
    if (stats.totalParticipants == 0) throw new Error("Nobody is participating in the current pool.");

    // check if current pool needs to be reset
    if (stats.selectedParticipants == stats.totalParticipants) 
        await resetUsers();

    // randomly choose user that hasn't been selected yet in the current pool
    const candidates = await UserModel.find({selected: false, unwatched_movies: {$gt: 0}});

    if (candidates.length == 0) {
        console.log("No candidates were found.");
        throw new Error("Internal Server error occured.");
    }

    const selectedUser = candidates[Math.floor(Math.random() * (candidates.length - 0) + 0)];

    // retrieve all unwatched movies added by selected user
    const userMovies = await MovieModel.find({watched: false, addedBy: selectedUser.username});

    // pick the movie with the lowest idx
    let selectedMovie = null;
    let minIdx = Number.MAX_SAFE_INTEGER;
    for (movie of userMovies) {
        if (movie.idx < minIdx) {
            selectedMovie = movie;
            minIdx = movie.idx;
        }
    }

    // update stats to reflect new movie OTW
    stats.watchOTW = selectedMovie.name;
    stats.addedBy = selectedMovie.addedBy;
    stats.note = selectedMovie.note;

    await stats.save();

    return selectedMovie.name;
}   

async function getSuggestions(user) {
    // unwatched movies from user
    var userMovies  = await getMovies('with', user);

    // unwatched movies from everyone else
    var otherMovies = await getMovies('without', user);

    //user's current choice
    var currentChoice = null;
    for (movie of userMovies) {
        if (currentChoice == null || movie.idx < currentChoice.idx)
            currentChoice = movie;
    }

    return {userMovies, otherMovies, currentChoice};
}

async function updatePoolStatus(user, participating) {
    user.participating = participating;
    await user.save();
}

async function updateSuggestion(prevSuggestion, newSuggestion) {
    const session = await db.startSession();

    // retrieving movie data
    var prevMovie = await MovieModel.findOne({name: prevSuggestion});
    var newMovie  = await MovieModel.findOne({name: newSuggestion});

    if (prevMovie == null || newMovie == null) {
        throw new Error("One of the movie searches came back null");
    }

    // swapping indexes
    let temp = prevMovie.idx;
    prevMovie.idx = newMovie.idx;
    newMovie.idx  = temp;

    // write idx updates to database
    await session.withTransaction(() => {
        return Promise.all([prevMovie.save(), newMovie.save()]);
    });
}

async function updateFormat() {
    console.log("dd");
    let movies = MovieModel.find({});
    for (let i = 0; i < movies.length; i++) {
        let current = movies[i];
        if (current.watched) {
            current.wDate = current.date;
            let date = new Date();
            date.setFullYear(2021, 1, 1);
            current.rDate = date;
        } else {
            current.wDate = new Date();
            current.rDate = current.date;
        }

        await current.save();
        console.log("updated this");
    }
    console.log("done");
}

async function removeSuggestion(movie) {
    await MovieModel.deleteOne({name: movie});
}

async function updateEmail(user, newEmail) {
    // update their email 
    user.email = newEmail;

    // save change
    await user.save();
}

async function updatePassword(user, oldPassword, newPassword) {
    // check if passwords match
    var result = await bcrypt.compare(oldPassword, user.password);

    if (!result) 
        throw new Error("Incorrect password entered.")
    

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(newPassword, salt);

    user.password = hash;

    // save change
    await user.save();
}

async function updateUsername(user, newUsername) {
    user.username = newUsername;

    // save change
    await user.save();
}

async function updateMovie(name, addedBy, teaser, description, rating, runtime, genre, posterLink) {
    // movie of the week query
    var movieOTW = await StatsModel.findOne({});
    
    // update stats 
    movieOTW.runtime     = runtime;
    movieOTW.genre       = genre;
    movieOTW.posterLink  = posterLink;
    movieOTW.watchOTW    = name;
    movieOTW.addedBy     = addedBy;
    movieOTW.note        = teaser;
    movieOTW.description = description;
    movieOTW.rating      = rating;

    // save change
    await movieOTW.save();
}


function parseString(movie) {
  // cleaning string for duplicate check
  var punctuation = '!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~ ';
  const letters = movie.toLowerCase().split('');

  // removing punctuation and whitespace from movie name
  const parsedArray = letters.filter(function(letter) {
  return punctuation.indexOf(letter) == -1; 
  });
  
  // invalid length check
  if (parsedArray.length >= 40) {
      throw new Error("Movie length exceeded.");
  }

  // combining filtered movie array into string
  parsedMovie = "";
  for (i in parsedArray) {
      parsedMovie += parsedArray[i];
  }   

  return parsedMovie;
}

function formatString(movie) {
  var formattedString = "";
  var split_movies = movie.split(" ");

  for (var i = 0; i < split_movies.length; i++) {
      formattedString += (split_movies[i].charAt(0).toUpperCase() + split_movies[i].slice(1));
      if (i != split_movies.length - 1)
          formattedString += " ";
  }

  return formattedString;
}

function getDate() {
  // create date instance
  var date = new Date().toString();
  var split_date = date.split(" ");
  date = "";
  for (i in split_date) {
      if (i >= 1 && i <= 3) {
          date += (i == 3) ? split_date[i] : split_date[i] + " ";
      }
  }

  return date;
}


module.exports = { suggestMovie, getHomeData, watchedMovie, chooseMovie, getMovies, getSuggestions, updateEmail, updateUsername, updatePassword, updateMovie, removeSuggestion, updatePoolStatus, updateSuggestion, updateFormat };