var express = require('express');
var router = express.Router();
var db = require('../db/index');

router.post('/updateMovie', async function (req, res) {
    try {
        await db.updateMovie(req.body.movieName, req.body.addedBy, req.body.teaser, req.body.description,
            req.body.rating, req.body.runtime, req.body.genre, req.body.posterLink);
        res.jsonp({success: true});
    } catch (error) {
        res.jsonp({success: false, val: error.toString()});
    }
});

module.exports = router;