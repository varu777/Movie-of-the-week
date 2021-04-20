const mongoose = require('mongoose');

var _db;

module.exports = {

  connectToServer: function(callback) {
    /* establishing database connection */
    mongoose.connect(process.env.DB_CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, client) {
        console.log("connected to db...");
        _db = mongoose.connection;
        return callback(err);
    });
  },

  getDb: function() {
    return _db;
  }
};