require('dotenv').config()
const mongoose = require('mongoose');
const MovieModel = require('./models/Movie');
const UserModel = require('./models/User');
const StatsModel = require('./models/Stats');


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
            name: movie.username, 
            teaser: movie.note, 
            addedBy: movie.addedBy, 
            dateWatched: movie.date
        });
    }

    // upcoming movies query
    const upcomingMoviesQuery = await MovieModel.find({watched: false});
    var upcomingMovies = []
    for (movie of upcomingMoviesQuery) {
        upcomingMovies.push({
            name: movie.name,
            user: movie.addedBy
        });
    }

    return {movieOTW, upcomingMovies, currentPool, watchedMovies}
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

module.exports = { suggestMovie, getHomeData };