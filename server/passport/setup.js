const passport = require("passport");
const bcrypt = require('bcrypt');
const UserModel = require('../db/models/User');
const localStrategy = require('passport-local');

passport.serializeUser(function(user, done) {
    if (user)
        done(null, user.username);
});

passport.deserializeUser(function(username, done) {
	UserModel.loadOne({$or: [{email: username}, {username: username}]}).then(function(user) {
        done(null, user);
    }).catch(function(err) {
        done(err, null);
    });
});

passport.use(new localStrategy(
  async function(username, password, done){
    var user = await UserModel.findOne({$or: [{email: username}, {username: username}] });

    // user not found check
    if (user == null) {
        return done(null, false, { message: 'User not found.' });
    }

    // check if passwords match
    var result = await bcrypt.compare(password, user.password);

    if (!result) {
        return done(null, false, { message: 'Incorrect password.' });
    }
        

    return done(null, user);
}
));

module.exports = passport;