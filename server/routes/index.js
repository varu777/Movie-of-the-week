var express = require('express');
var router = express.Router();
var dbIndex = require('../db/functions');

router.post('/SuggestMovie', function (req, res) {
    dbIndex.suggestMovie(req.body.movie, req.body.name, req.body.movieNote)
        .then((data) => {
            res.jsonp({success: true, val: data.movie, ticketNum: data.ticketNum});
        })
        .catch((error) => {
            res.jsonp({success: false, val: error.toString()});
        });
});

router.get('/WatchedMovie', function (req, res) {
    dbIndex.watchedMovie()
        .then(() => {
            res.jsonp({success: true, val: "Movie of the Week has been cleared."});
        })
        .catch((error) => {
            console.log(error);
            res.jsonp({success: false, val: error.toString()});
        })
});

router.get('/ChooseMovie', function (req, res) {
    dbIndex.chooseMovie()
        .then((movie) => {
            res.jsonp({success: true, val: movie + " has been chosen."});
        })
        .catch((error) => {
            console.log(error);
            res.jsonp({success:false, val: error.toString()});
        });
});

router.get('/HomeData', function (req, res) {
    dbIndex.getHomeData()
        .then((data) => {
            res.jsonp({success: true, movieOTW: data.movieOTW, movies: data.watchedMovies, upcomingMovies: data.upcomingMovies, currentPool: data.currentPool});
        })
        .catch((error) => {
            res.jsonp({success: false, val: error.toString()});
        }); 
});

module.exports = router;