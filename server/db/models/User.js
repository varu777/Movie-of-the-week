const mongoose = require('mongoose');

const schema = new mongoose.Schema({username: String, participating: Boolean, selected: Boolean, suggestion: String, total_movies: Number, unwatched_movies: Number, email: String, password: String});

// function for encrypting password
schema.methods.generateHash = (password) => {
}

// checks for correct password
schema.methods.validatePassword = (password) => {
}

const User = mongoose.model('User', schema);

module.exports = { User };