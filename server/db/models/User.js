const mongoose = require('mongoose');

const schema = new mongoose.Schema({_id: mongoose.ObjectId, username: String, participating: Boolean, selected: Boolean, suggestion: String, total_movies: Number, unwatched_movies: Number, email: String, password: String});

module.exports = mongoose.model('users', schema);
