require('dotenv').config()
const express  = require('express');
const app      = express();
var session    = require('express-session');
const MongoStore = require('connect-mongo').default;
const path     = require('path');
const cors     = require('cors');
const port = process.env.PORT || 9000;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const router = require('./routes/index');

/* establishing database connection */
mongoose.connect(process.env.DB_CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', err => {
  console.log("connected to db");
});

/* Redirect http to https */
app.get('*', function(req, res, next) {
  if (req.headers['x-forwarded-proto'] != 'https' && process.env.NODE_ENV === 'production')
    res.redirect('https://' + req.hostname + req.url)
  else
    next() /* Continue to other routes if we're not redirecting */
});

const env = process.env.NODE_ENV === 'production' ? 'https://movieotw.herokuapp.com/' : 'http://localhost:3000'
app.use(cors({credentials: true, origin: env}));
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', env);
    res.header(
      'Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization,  X-PINGOTHER'
    );
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS');
    next();
});
app.use(cookieParser());
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({
  secret: 'hi',
  saveUninitialized: false,
  resave: false, // TODO: look into whether store uses touch method 
  store: MongoStore.create({
    mongoUrl: process.env.DB_CONNECTION_URL,
  })
}));
/*
app.use(express.static(path.join(__dirname, '../client/build')));
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});
*/


const passport = require('./passport/setup');
app.use(passport.initialize());
app.use(passport.session());

app.use('/', router);

app.listen(port);

module.exports = app;