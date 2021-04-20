var express = require('express');
var router = express.Router();
var db = require('../db/index');

router.post('/updateEmail', async function (req, res) {
    try {
        await db.updateEmail(req.user, req.body.email);
        res.jsonp({success: true});
    } catch (error) {
        res.jsonp({success: false, val: error.toString()});
    }
});

router.post('/updateUsername', async function (req, res) {
    try {
        await db.updateUsername(req.user, req.body.username);
        res.jsonp({success: true});
    } catch (error) {
        res.jsonp({success: false, val: error.toString()});
    }
});

router.post('/updatePassword', async function (req, res) {
    try {
        await db.updatePassword(req.user, req.body.currPassword, req.body.newPassword);
        res.jsonp({success: true});
    } catch (error) {
        res.jsonp({success: false, val: error.toString()});
    }
});

module.exports = router;