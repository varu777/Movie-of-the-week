var express = require('express');
var router = express.Router();
var db = require('../db/index');

router.post('/updateEmail', async function (req, res) {
    console.log(req.user);
    var result = await db.updateEmail(req.user, req.body.email);
    console.log(result);
    // result.then((val) => {
    //     res.jsonp({success: true, val: val.movie, movieIdx: val.movieIdx});
    // }).catch((err) => {
    //     res.jsonp({success: false, val: err.toString()});
    // });
})