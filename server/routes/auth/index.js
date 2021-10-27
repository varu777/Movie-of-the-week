var express = require('express');
var router = express.Router();
var passport = require('passport');

router.post('/login', (req, res, next) => { passport.authenticate('local',
    (err, user, info) => {
        if (err) return next(err);
        if (!user) res.send({ success: false, message: 'Incorrect login.' });

        req.logIn(user, function(err) {
            if (err) return next(err);

            res.send({ success: true })
        });

    })(req, res, next);
});

router.get('/loginCheck', function (req, res) {
    res.jsonp({ isLoggedIn: req.user != null, currentUser: req.user });
});

router.get('/logout', function (req, res, next) {
    req.logOut();
    res.clearCookie('connect.sid');
    req.session.destroy(function (err) {
        res.jsonp({ success: true });
    });
});

module.exports = router;