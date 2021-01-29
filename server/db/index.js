require('dotenv').config()
const mongoose = require('mongoose');
const MovieModel = require('./models/Movie');
const UserModel = require('./models/User');
const StatsModel = require('./models/Stats');
const { startSession } = require('./models/User');


/* establishing database connection */
mongoose.connect(process.env.DB_CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', err => {
  console.log("connected to db");
});


// update database using transaction for atomicity, reads first then writes as specified by firebase
function addMovieTransaction(parsedMovie, movieName, user, note) {
    return new Promise( (resolve, reject) => {
        // will contain user info
        var userResult = null;

        // will contain database info
        var statsResult = null;

        // checking if movie has been added
        MovieModel.findOne({parsedName: parsedMovie}, (err, movie) => {
            if (err) 
                reject(new Error(err));

            else if (movie != null)  
                reject(new Error("Movie already inserted."));

        }).then(() => { // read user data
            return UserModel.findOne({username: user}, (err, user) => {
                if (err) 
                    reject(new Error(err));
                
                else if (user == null) {
                    reject(new Error("User not found."));
                }

                // grabbing relevant user data 
                userResult = user;
            });
        }).then(() => { // read database stats
            return StatsModel.findOne({}, (err, stats) => {
                if (err) {
                    console.log("Unable to retrieve database stats.");
                    reject(new Error(err));
                }

                else if (stats == null) {
                    console.log("Unable to retrieve database stats.");
                    reject(new Error("Internal error occured."));
                }

                statsResult = stats;
            });
        }).then(() => { // write data to db
            // update stats 
            statsResult.totalMovies = statsResult.totalMovies + 1;
            statsResult.totalParticipants = userResult.participating == false ? statsResult.totalParticipants + 1 : statsResult.totalParticipants;

            // update the user's total movie count and unwatched movie count
            userResult.total_movies = userResult.total_movies + 1;
            userResult.unwatched_movies = userResult.unwatched_movies + 1;
            userResult.participating = true;
            userResult.suggestion = userResult.suggestion === "" ? movieName : userResult.suggestion;


            // create new object for movies collection
            const movie = new MovieModel({
                parsedName: parsedMovie,
                name: movieName, 
                idx: statsResult.totalMovies, 
                addedBy: user, 
                date: getDate(),
                watched: false,
                note: note
            });
            // complete all updates
            Promise.all([statsResult.save(), userResult.save(), movie.save()])
            .then(() => {
                resolve({movieIdx: statsResult.totalMovies});
            }).catch((error) => {
                reject(new Error(error));
            });
        });
    });
}

async function suggestMovie(movie, user, note) {
    const session = await db.startSession();
    const parsedMovie = parseString(movie);
    const formattedMovie = formatString(movie);

    // moviedIdx of movie if successfully added
    var movieIdx = -1;

    await session.withTransaction(() => {
        return addMovieTransaction(parsedMovie, formattedMovie, user, note).then((result) => {
            movieIdx = result.movieIdx;
        });
    });

    return {movie: formattedMovie, movieIdx: movieIdx};
}

async function getHomeData() {
    // movie of the week query
    const movieOTW = await StatsModel.findOne({});

    // current pool query
    const unselectedUsers = await UserModel.find({participating: true, selected: false});
    var currentPool = [];
    for (user of unselectedUsers) {
        currentPool.push({
            name: user.username, 
            suggestion: user.suggestion
        });
    }

    // watched movies query
    const watchedMoviesQuery = await MovieModel.find({watched: true});
    var watchedMovies = []
    for (movie of watchedMoviesQuery) {
        watchedMovies.push({
            name: movie.name, 
            teaser: movie.note, 
            addedBy: movie.addedBy, 
            dateWatched: movie.date
        });
    }

    // upcoming movies query
    const upcomingMoviesQuery = await MovieModel.find({watched: false}).sort('name');
    var upcomingMovies = []
    for (movie of upcomingMoviesQuery) {
        upcomingMovies.push({
            name: movie.name,
            user: movie.addedBy
        });
    }

    return {movieOTW, upcomingMovies, currentPool, watchedMovies}
}

async function watchedMovie() {
    // retrieve stats
    let watchOTW = await StatsModel.findOne({});
    if (watchOTW == null) throw new Error("Watch of the Week is already cleared.");

    // retrieve user OTW info
    let user = await UserModel.findOne({username: watchOTW.addedBy});

    // retrieve movie otw info
    let movie = await MovieModel.findOne({name: watchOTW.watchOTW});

    // update user info
    user.unwatched_movies = user.unwatched_movies - 1;
    user.participating = user.unwatched_movies == 0 ? false : true;
    user.selected = true;

    // clear watch OTW
    watchOTW.watchOTW = '';
    watchOTW.addedBy = '';
    watchOTW.watchedMovies = watchOTW.watchedMovie + 1;
    watchOTW.selected = watchOTW.selected + 1;

    // updating movie otw as watched
    movie.watched = true;
    movie.date = getDate();

    // write all updates to db
    await session.withTransaction(() => {
        return Promise.all([user.save(), watchOTW.save(), movie.save()]);
    });
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
    const candidates = UserModel.find({selected: false, unwatched_movies: {$gt: 0}});
    const selectedUser = candidates[Math.floor(Math.random() * (candidates.length - 0) + 0)];

    // retrieve all unwatched movies added by selected user
    const userMovies = MovieModel.find({watched: false, addedBy: selectedUser.username});

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
    let stats = await StatsModel.findOne({});
    stats.watchOTW = selectedMovie.name;
    stats.addedBy = selectedMovie.addedBy;
    stats.note = selectedMovie.note;

    await stats.save();
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

module.exports = { suggestMovie, getHomeData, watchedMovie, chooseMovie };