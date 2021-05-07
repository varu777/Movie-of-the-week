const mongoose = require('mongoose');
const schema = mongoose.Schema({watchOTW: String, addedBy: String, description: String, runtime: String, rating: String, posterLink: String, genre: String, note: String, totalParticipants: Number, selectedParticipants: Number, totalMovies: Number, watchedMovies: Number});

module.exports = mongoose.model('stats', schema);