const mongoose = require('mongoose');
const models = require('./models');

// initializing models
const UserModel = mongoose.model('User');
const StatModel = mongoose.model('Stat');
const MovieModel = mongoose.model('Movie');

// update database using transaction for atomicity, reads first then writes as specified by firebase
function addMovieTransaction(parsedMovie, movie, user, note) {
    return db.runTransaction((transaction) => {
        return new Promise((resolve, reject) => {
            var movieRef = db.collection("movies").doc(parsedMovie);
            var idxRef = db.collection("stats").doc("stats");
            var userRef = db.collection("users").doc(user);
            var newUserTotalMovies = -1;
            var newUserUnwatchedMovies = -1;
            var totalMovies = -1;
            var totalParticipants = -1;
            var userParticipating = true;
            var suggestedMovie = '';

            // duplicate check
            transaction.get(movieRef).then((doc) => {
                if (doc.exists) {
                    if (doc.data().watched) {
                        throw new Error("Movie has already been watched. Consult with the others if they'd like to rewatch it.")
                    } else {
                        throw new Error("Movie has been added by someone else, but has not been watched yet.");
                    }
                }
            }).then(() => {     // doing reads first
                // read user data
                return transaction.get(userRef).then((doc) => {
                    // error if user doesn't exist
                    if (!doc.exists) {
                        throw new Error("User does not exist.");
                    }

                    newUserTotalMovies = doc.data().total_movies + 1;
                    newUserUnwatchedMovies = doc.data().unwatched_movies + 1;
                    userParticipating = doc.data().participating;
                    suggestedMovie = doc.data().suggestion;
                });
            }).then(() => {
                // now read total movie count and get new movie idx
                return transaction.get(idxRef).then((result) => {
                    totalMovies = result.data().totalMovies;
                    totalParticipants = result.data().participants;
                })
            }).then(() => { // doing writes now

                // update the user's total movie count and unwatched movie count
                transaction.update(userRef, {total_movies: newUserTotalMovies, unwatched_movies: newUserUnwatchedMovies, participating: true, suggestion: suggestedMovie === '' ? movie : suggestedMovie});

                // update overall total movie count 
                transaction.update(idxRef, {totalMovies: totalMovies + 1, participants: userParticipating == false ? totalParticipants + 1 : totalParticipants});

                // add to movies collection
                transaction.set(movieRef, {
                    movie: movie,
                    addedBy: user,
                    note: note, 
                    watched: false,
                    date: getDate(),
                    movieIdx: totalMovies + 1
                });

                // success
                resolve({movie: movie, ticketNum: totalMovies + 1});
            }).catch((error) => {
                reject (error)});
        }); 
    });
}

function suggestMovie(movie, user, note) {
    return new Promise((resolve, reject) => {
        const parsedMovie = parseString(movie);
        const formattedMovie = formatString(movie);

        // add movie and update user info
        addMovieTransaction(parsedMovie, formattedMovie, user, note).then((movieId) => {
            // successfully added movie
            resolve(movieId);
        }).catch((error) => {reject(error); }) 
    });
}

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

function getHomeData() {
    return new Promise((resolve, reject) => {
        var watchedMovies = [];
        var upcomingMovies = [];
        var movieOTW = null;
        var currentPool = []
        db.collection("stats").doc("stats").get().then((result) => {
            movieOTW = result.data();
        }).then(() => {
            return db.collection("movies").get().then((queryResults) => {
                queryResults.forEach((doc) => {
                    if (doc.data().watched) 
                        watchedMovies.push({name: doc.data().movie, teaser: doc.data().note, addedBy: doc.data().addedBy, dateWatched: doc.data().date});
                    else
                        upcomingMovies.push({name: doc.data().movie, user: doc.data().addedBy});
                });

                // sort upcoming movies by date

            });
        }).then(() => {
            // get current pool of participants
            return db.collection("users").where("participating", "==", true).where("selected", "==", false).get().then((queryResults) => {
                queryResults.forEach((doc) => {
                    currentPool.push({name: doc.data().name, suggestion: doc.data().suggestion});
                });
            });
        }).then(() => {
            if (movieOTW == null) 
                throw new Error("Unable to retrieve movie of the week.");

            if (watchedMovie.length == null) 
                throw new Error("Unable to retrieve previously watched movies.");
            
            resolve({movieOTW, upcomingMovies, watchedMovies, currentPool});
        }).catch((error) => reject(error));
    });
}

function getMovieOTW() {
    return new Promise((resolve, reject) => {
        db.collection("stats").doc("stats").get().then((result) => {
            if (!result.exists)
                throw new Error("Stats don't exist.");
            
            // success
            resolve(doc.data().movieOTW);
        })
        .catch((error) => {reject(error);});
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

module.exports = {suggestMovie, chooseMovie, getHomeData, watchedMovie, getMovieOTW};