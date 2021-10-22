function isLoggedIn(req, res, next) {
    if (req.user) {
        return next();
    }

    res.jsonp({success: false, isLoggedIn: false});
}

module.exports = isLoggedIn;