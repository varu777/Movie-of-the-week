const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../../utils/serverUtils');
const db = require('../../db/index');

router.post('/suggestMovie', isLoggedIn, async function (req, res) {
    try {
        let data = await db.suggestMovie(req.body.movie, req.user._id);
        res.jsonp({ success: true, val: data.movie, movieIdx: data.movieIdx });
    } catch (error) {
        res.jsonp({success: false, val: error.toString()});
    }
});

router.get('/watchedMovie', isLoggedIn, async function (req, res) {
    try {
        await db.watchedMovie();
        res.jsonp({success: true, val: "Movie of the Week has been cleared."});
    } catch (error) {
        console.log(error);
        res.jsonp({success: false, val: error.toString()});
    }
});

router.get('/chooseMovie', isLoggedIn, async function (req, res) {
    try {
        let movie = await db.chooseMovie();
        res.jsonp({ success: true, vaL: movie + "has been chosen."});
    } catch (error) {
        console.log(error);
        res.jsonp({success:false, val: error.toString()});
    }
});

router.get('/homeData', isLoggedIn, async function (req, res) {
    try {
        let data = await db.getHomeData();
        res.jsonp({ success: true, movieOTW: data.movieOTW, user: data.currUser, watchedMovies: data.watchedMovies, upcomingMovies: data.upcomingMovies,
            currentPool: data.currentPool, recentUpdates: data.recentUpdates  });
    } catch (error) {
        console.log(error.toString());
        res.jsonp({success: false, val: error.toString()});
    }
});

router.post('/sortMovies', isLoggedIn, async function (req, res) {
    try {
        let movies = await db.getMovies(req.body.sortBy, req.body.movieType === "watched");
        res.jsonp({ movies });
    } catch (error) {
        res.jsonp({ success: false, val: error.toString() });
    }
});

router.get('/loadSuggestions', isLoggedIn, async function (req, res) {
    try {
        let data = await db.getSuggestions(req.user);
        res.jsonp({ enteredPool: req.user.participating, userMovies: data.userMovies, otherMovies: data.otherMovies, currentChoice: data.currentChoice });
    } catch (error) {
        res.jsonp({success: false, val: error.toString()});
    }
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