const mongoose = require('mongoose');

const schema = mongoose.Schema({name: String, idx: Number, addedBy: String, date: String, idx: Number, watched: Boolean, note: String});
const Movie = mongoose.model('Movie', schema);

module.exports = { Movie };