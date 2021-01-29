const mongoose = require('mongoose');

const UserModel = require('./models/User');
const StatsModel = require('./models/Stats');
const MovieModel = require('./models/Movie');

function chooseMovieTransaction(user) {
    return db.runTransaction((transaction) => {
        return new Promise((resolve, reject) => {
            var movieRef = db.collection("movies");
            var motwIdx = db.collection("stats").doc("stats");
            var chosenMovie = null;

            // select the unwatched movie suggested by the user that's been in the db for the longest time
            // doing reads first
            movieRef.where("addedBy", "==", user).where("watched", "==", false).get(movieRef).then((movies) => {
                var movieIdx = Number.MAX_SAFE_INTEGER;
                movies.forEach((movie) => {
                    let currIdx = movie.data().movieIdx;
                    if (currIdx < movieIdx) {
                        movieIdx = currIdx;
                        chosenMovie = movie.data();
                    }
                });

                // error if no movie was selected
                if (chosenMovie == null) 
                    throw new Error("User does not have any unwatched movies.");

            }).then(() => {
                // update movie of the week and user
                transaction.update(motwIdx, {movieOTW: chosenMovie.movie, note: chosenMovie.note, addedBy: user});

                // success
                resolve(chosenMovie.movie);
            }).catch((error) => {
                reject(error);
            })
        });
    });
}

function resetUsers() {
    return new Promise((resolve, reject) => {
        // reset selected boolean for each user
        var allUsersRef = db.collection("users");
        var newParticipants = 0;
        allUsersRef.get().then((queryResults) => {
            queryResults.forEach((user) => {
                const data = user.data();
                var userRef = db.collection("users").doc(data.name);
                if (data.unwatched_movies > 0) {
                    newParticipants++;
                }

                userRef.update({selected: false});
            });

            // reset global selected count 
            var statsRef = db.collection("stats").doc("stats");
            statsRef.update({selected: 0, participants: newParticipants});
            resolve();
        }).catch((error) => {
            console.log("err");
            reject(error);
        });
    });
}

function chooseMovie() {
    return new Promise((resolve, reject) => {
        // fetch users
        var allUsersRef = db.collection("users");
        var statsRef = db.collection("stats").doc("stats");
        var eligibleUsers = []
        var selectedUser = null;

        // check if every user that has unwatched movies has been selected already
        statsRef.get().then((stats) => {
            let selected = stats.data().selected;
            let participants = stats.data().participants;
            let watchedMovies = stats.data().watchedMovies;
            let totalMovies = stats.data().totalMovies;

            // All movies watched
            if (totalMovies == watchedMovies) {
                throw new Error("Every movie added has been watched.");
            }

            // zero participants
            if (participants == 0) {
                throw new Error("Nobody is participating in the current pool.");
            }

            // check if every current participant's selected boolean needs to be reset to false, meaning every participant has been selected for the current pool
            if (selected == participants) {
                return true;
            }
           
            return false;
        }).then((needsReset) => {
            if (needsReset) {
                return resetUsers();
            }
        }).then(() => {
            // randomly choose a user that hasn't been selected yet in the current pool
            return allUsersRef.get().then((queryResults) => {
                queryResults.forEach((doc) => {
                    const selected = doc.data().selected;
                    const unwatched_movies = doc.data().unwatched_movies;

                    if (selected == false && unwatched_movies > 0) {
                        eligibleUsers.push(doc.data().name);
                    }
                });

                // choose random user from eligible users
                const randomIdx = Math.floor(Math.random() * (eligibleUsers.length - 0) + 0);
                selectedUser = eligibleUsers[randomIdx];
            });
        }).then(() => {
            return chooseMovieTransaction(selectedUser);
        })
        .then((movie) => {
            resolve(movie);
        })
        .catch((error) => {
            reject(error);
        });
    });
}

function watchedMovie() {
    return new Promise((resolve, reject) => {
        // getting value of movie of the week
        var previousMotw = '';
        var userUnwatched = -1;
        var totalParticipants = -1;
        var globalSelected = -1;
        var user = null;

        const statsRef = db.collection("stats").doc("stats");
        statsRef.get().then((result) => {
            if (result.data().movieOTW === '') 
                throw new Error("Movie of the Week was empty.");

            previousMotw = result.data().movieOTW;
            totalParticipants = result.data().participants;
            globalSelected = result.data().selected;
            user = result.data().addedBy;
        }).then(() => {
            const userRef = db.collection("users").doc(user);
            return userRef.get().then((result) => {
                userUnwatched = result.data().unwatched_movies;
            });
        }).then(() => {
            // updating user data
            const userRef = db.collection("users").doc(user);
            const newUnwatched = userUnwatched - 1;
            userRef.update({unwatched_movies: newUnwatched, participating: newUnwatched == 0 ? false : true, selected: true});

            // clearing movie of the week
            statsRef.update({movieOTW: '', addedBy: '', note: '', watchedMovies: firebase.firestore.FieldValue.increment(1), selected:  firebase.firestore.FieldValue.increment(1)});

            // updating movie of the week as watched
            const parsedMovie = parseString(previousMotw);
            const movieRef = db.collection("movies").doc(parsedMovie);
            movieRef.update({watched: true, date: getDate()});
        }).then(() => { 
            resolve();
        }).catch((error) => { reject(error) });
    });
}

function parsestring(movie) {
    // cleaning string for duplicate check
    var punctuation = '!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~ ';
    const letters = movie.tolowercase().split('');

    // removing punctuation and whitespace from movie name
    const parsedarray = letters.filter(function(letter) {
    return punctuation.indexof(letter) == -1; 
    });
    
    // invalid length check
    if (parsedarray.length >= 40) {
        throw new error("movie length exceeded.");
    }

    // combining filtered movie array into string
    parsedmovie = "";
    for (i in parsedarray) {
        parsedmovie += parsedarray[i];
    }   

    return parsedmovie;
}

function formatstring(movie) {
    var formattedstring = "";
    var split_movies = movie.split(" ");

    for (var i = 0; i < split_movies.length; i++) {
        formattedstring += (split_movies[i].charat(0).touppercase() + split_movies[i].slice(1));
        if (i != split_movies.length - 1)
            formattedstring += " ";
    }

    return formattedstring;
}

function getdate() {
    // create date instance
    var date = new date().tostring();
    var split_date = date.split(" ");
    date = "";
    for (i in split_date) {
        if (i >= 1 && i <= 3) {
            date += (i == 3) ? split_date[i] : split_date[i] + " ";
        }
    }

    return date;
}

module.exports = {chooseMovie, watchedMovie };