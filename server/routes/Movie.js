var express = require('express');
var router = express.Router();
var db = require('../db/index');

router.post('/updateMovie', async function (req, res) {
    try {
        await db.updateMovie(req.body.movieName, req.body.addedBy, req.body.description,
            req.body.rating, req.body.runtime, req.body.genre, req.body.posterLink);
        res.jsonp({success: true});
    } catch (error) {
        res.jsonp({success: false, val: error.toString()});
    }
});

router.post('/updateSuggestion', async function (req, res) {
    try {
        await db.updateSuggestion(req.body.previous, req.body.new);
        await db.updatePoolStatus(req.user, true);
        req.participating = true;
        res.jsonp({success: true});
    } catch (error) {
        res.jsonp({success: false, val: error.toString()});
    }
});

router.post('/removeSuggestion', async function (req, res) {
    try {
        await db.removeSuggestion(req.body.movie)
        res.jsonp({success: true});
    } catch (error) {
        res.jsonp({success: false, val: error.toString()});
    }
});

router.get('/getMovies', async function (req, res) {
    try {
        let movies = await db.getMovies('name', false); 
        res.jsonp({success: true, movies: movies});
    } catch (error) {
        res.jsonp({success: false, val: error.toString()});
    }
});

router.post('/watchedMovie', async function (req, res) {
    try {
        await db.watchedMovie(req.body.movie);
        res.jsonp({success: true});
    } catch (error) {
        res.jsonp({success: false, val: error.toString()});
    }
});

router.post('/updateFormat', async function (req, res) {
    try {
        console.log("starting");
        await db.updateFormat();
        res.jsonp({success: true});
    } catch (error) {
        res.jsonp({success: false, val: error.toString()});
    }

});

module.exports = router;