require('dotenv').config()
const mongoose = require('mongoose');
mongoose.connect(process.env.DB_CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', err => {
  console.log("connected to db");
});

module.exports = { db };