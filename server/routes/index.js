var express = require('express');
var router = express.Router();
var passport = require('passport');
var db = require('../db/index');

function isLoggedIn(req, res, next) {
    if (req.user) {
        return next();
    }
    
    res.jsonp({success: false, isLoggedIn: false});
}

router.post('/SuggestMovie', isLoggedIn, function (req, res) {
    var result = db.suggestMovie(req.body.movie, req.user._id, req.body.movieNote);
    result.then((val) => {
        res.jsonp({success: true, val: val.movie, movieIdx: val.movieIdx});
    }).catch((err) => {
        res.jsonp({success: false, val: err.toString()});
    });
});

router.get('/WatchedMovie', function (req, res) {
    db.watchedMovie()
        .then(() => {
            res.jsonp({success: true, val: "Movie of the Week has been cleared."});
        })
        .catch((error) => {
            console.log(error);
            res.jsonp({success: false, val: error.toString()});
        })
});

router.get('/ChooseMovie', function (req, res) {
    db.chooseMovie()
        .then((movie) => {
            res.jsonp({success: true, val: movie + " has been chosen."});
        })
        .catch((error) => {
            console.log(error);
            res.jsonp({success:false, val: error.toString()});
        });
});

router.get('/loginCheck', function (req, res) {
   res.jsonp({isLoggedIn: req.user != null, currentUser: req.user});
});

router.get('/HomeData', function (req, res) {
    db.getHomeData()
        .then((data) => {
            res.jsonp({success: true, movieOTW: data.movieOTW, user: data.currUser, watchedMovies: data.watchedMovies, upcomingMovies: data.upcomingMovies, currentPool: data.currentPool, recentUpdates: data.recentUpdates});
        })
        .catch((error) => {
            console.log(error.toString());
            res.jsonp({success: false, val: error.toString()});
        }); 
});

router.post('/SortMovies', function (req, res) {
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

router.get('/logout', function (req, res, next) {
    req.logOut();
    res.clearCookie('connect.sid');
    req.session.destroy(function (err) {
        res.jsonp({success: true});
    });
});


router.post('/login', (req, res, next) => { passport.authenticate('local',
    (err, user, info) => {
        if (err) {
            return next(err);
        }
      
        if (!user) {
            res.send({success: false, message: 'Incorrect login.'});
        }
      
        req.logIn(user, function(err) {
            if (err) {
                return next(err);
            }
            
            res.send({success: true})
        });
      
    })(req, res, next);
});

module.exports = router;