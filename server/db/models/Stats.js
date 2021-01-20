const mongoose = require('mongoose');

const schema = mongoose.Schema({watchOTW: String, addedBy: String, note: String, participants: Number, selectedParticipants: Number, totalMovies: Number, watchedMovies: Number});
const Stats = mongoose.model('Stat', schema);

module.exports = { Stats };