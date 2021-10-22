var express = require('express');
var router = express.Router();
var isLoggedIn = require('../../utils/serverUtils');
var db = require('../../db/index');

router.post('/suggestMovie', isLoggedIn, function (req, res) {
    var result = db.suggestMovie(req.body.movie, req.user._id);
    result.then((val) => {
        res.jsonp({success: true, val: val.movie, movieIdx: val.movieIdx});
    }).catch((err) => {
        res.jsonp({success: false, val: err.toString()});
    });
});

router.get('/watchedMovie', isLoggedIn, function (req, res) {
    db.watchedMovie()
        .then(() => {
            res.jsonp({success: true, val: "Movie of the Week has been cleared."});
        })
        .catch((error) => {
            console.log(error);
            res.jsonp({success: false, val: error.toString()});
        })
});

router.get('/chooseMovie', isLoggedIn, function (req, res) {
    db.chooseMovie()
        .then((movie) => {
            res.jsonp({success: true, val: movie + " has been chosen."});
        })
        .catch((error) => {
            console.log(error);
            res.jsonp({success:false, val: error.toString()});
        });
});

router.get('/homeData', isLoggedIn, function (req, res) {
    db.getHomeData()
        .then((data) => {
            res.jsonp({success: true, movieOTW: data.movieOTW, user: data.currUser, watchedMovies: data.watchedMovies, upcomingMovies: data.upcomingMovies, currentPool: data.currentPool, recentUpdates: data.recentUpdates});
        })
        .catch((error) => {
            console.log(error.toString());
            res.jsonp({success: false, val: error.toString()});
        });
});

router.post('/sortMovies', isLoggedIn, function (req, res) {
    db.getMovies(req.body.sortBy, req.body.movieType === "watched" ? true : false)
        .then((movies) => {
            res.jsonp({movies});
        })
        .catch((error) => {
            res.jsonp({success: false, val: error.toString()});
        });
});

router.get('/loadSuggestions', isLoggedIn, function (req, res) {
    db.getSuggestions(req.user)
        .then(({userMovies, otherMovies, currentChoice}) => {
            res.jsonp({enteredPool: req.user.participating, userMovies: userMovies, otherMovies: otherMovies, currentChoice: currentChoice});
        })
        .catch((error) => {
            res.jsonp({success: false, val: error.toString()});
        })
});

router.post('/updateMovie', isLoggedIn, async function (req, res) {
    try {
        await db.updateMovie(req.body.movieName, req.body.addedBy, req.body.description,
            req.body.rating, req.body.runtime, req.body.genre, req.body.posterLink);
        res.jsonp({success: true});
    } catch (error) {
        res.jsonp({success: false, val: error.toString()});
    }
});

router.post('/updateSuggestion', isLoggedIn, async function (req, res) {
    try {
        await db.updateSuggestion(req.body.previous, req.body.new);
        await db.updatePoolStatus(req.user, true);
        req.participating = true;
        res.jsonp({success: true});
    } catch (error) {
        res.jsonp({success: false, val: error.toString()});
    }
});

router.post('/removeSuggestion', isLoggedIn, async function (req, res) {
    try {
        await db.removeSuggestion(req.body.movie)
        res.jsonp({success: true});
    } catch (error) {
        res.jsonp({success: false, val: error.toString()});
    }
});

router.get('/getMovies', isLoggedIn, async function (req, res) {
    try {
        let movies = await db.getMovies('name', false);
        res.jsonp({success: true, movies: movies});
    } catch (error) {
        res.jsonp({success: false, val: error.toString()});
    }
});

router.post('/watchedMovie', isLoggedIn, async function (req, res) {
    try {
        await db.watchedMovie(req.body.movie);
        res.jsonp({success: true});
    } catch (error) {
        res.jsonp({success: false, val: error.toString()});
    }
});

router.post('/updateFormat', isLoggedIn, async function (req, res) {
    try {
        console.log("starting");
        await db.updateFormat();
        res.jsonp({success: true});
    } catch (error) {
        res.jsonp({success: false, val: error.toString()});
    }

});


module.exports = router;