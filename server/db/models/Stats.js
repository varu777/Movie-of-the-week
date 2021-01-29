const mongoose = require('mongoose');
const schema = mongoose.Schema({watchOTW: String, addedBy: String, note: String, totalParticipants: Number, selectedParticipants: Number, totalMovies: Number, watchedMovies: Number});

module.exports = mongoose.model('stats', schema);