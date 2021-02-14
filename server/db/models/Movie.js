const mongoose = require('mongoose');
const Schema = mongoose.Schema({parsedName: String, name: String, idx: Number, addedBy: String, date: Date, watched: Boolean, note: String});

module.exports = mongoose.model('movies', Schema);