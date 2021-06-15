const mongoose = require('mongoose');
const schema = mongoose.Schema({user: mongoose.ObjectId, movie: String, action: String, date: Date, reviewText: String, rating: Number});

module.exports = mongoose.model('updates', schema);