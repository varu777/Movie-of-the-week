var express = require('express');
var router = express.Router();
var isLoggedIn = require('../../utils/serverUtils');
var db = require('../../db');

router.post('/updateEmail', isLoggedIn, async function (req, res) {
    try {
        await db.updateEmail(req.user, req.body.email);
        res.jsonp({success: true});
    } catch (error) {
        res.jsonp({success: false, val: error.toString()});
    }
});

router.post('/updateUsername', isLoggedIn, async function (req, res) {
    try {
        await db.updateUsername(req.user, req.body.username);
        res.jsonp({success: true});
    } catch (error) {
        res.jsonp({success: false, val: error.toString()});
    }
});

router.post('/updatePassword', isLoggedIn, async function (req, res) {
    try {
        await db.updatePassword(req.user, req.body.currPassword, req.body.newPassword);
        res.jsonp({success: true});
    } catch (error) {
        res.jsonp({success: false, val: error.toString()});
    }
});

router.post('/enterPool', isLoggedIn, async function (req, res) {
    try {
        await db.updatePoolStatus(req.user, true);
        req.user.participating = true;
        res.jsonp({success: true});
    } catch (error) {
        res.jsonp({success: false, val: error.toString()});
    }
});

router.post('/leavePool', isLoggedIn, async function (req, res) {
    try {
        await db.updatePoolStatus(req.user, false);
        req.user.participating = false;
        res.jsonp({success: true});
    } catch (error) {
        res.jsonp({success: false, val: error.toString()});
    }
});

module.exports = router;