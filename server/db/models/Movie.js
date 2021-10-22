const mongoose = require('mongoose');
const Schema = mongoose.Schema({parsedName: String, name: String, idx: Number, addedBy: mongoose.ObjectId, date: Date, watched: Boolean});

module.exports = mongoose.model('movies', Schema);