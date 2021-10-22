require('dotenv').config()
const express  = require('express');
const app   = express();
var session = require('express-session');
const MongoStore = require('connect-mongo');
const path = require('path');
const cors = require('cors');
const port = process.env.PORT || 9000;
const mongoUtil = require('./utils/mongoUtil');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');


/* establishing database connection */
mongoUtil.connectToServer(function(err, client) {
  const userRouter = require('./routes/user/index');
  const movieRouter = require('./routes/movies/index');
  const authRouter = require('./routes/auth/index');

  // report error if one exists
  if (err) console.log(err);

  /* Redirect http to https */
  app.get('*', function(req, res, next) {
    if (req.headers['x-forwarded-proto'] != 'https' && process.env.NODE_ENV === 'production') {
      console.log('https://' + req.hostname + req.url);
      res.redirect('https://' + req.hostname + req.url);
    }
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
  app.use(cookieParser('hi'));
  app.use(bodyParser.json()); 
  app.use(bodyParser.urlencoded({ extended: false }));

  app.use(session({
    secret: 'hi',
    saveUninitialized: false,
    resave: false, // TODO: look into whether store uses touch method 
    cookie: {maxAge: 18144e5}, // 3 weeks
    store: MongoStore.create({
      mongoUrl: process.env.DB_CONNECTION_URL,
    })
  }));

  const passport = require('./passport/setup');
  app.use(passport.initialize());
  app.use(passport.session());

  app.use('/user', userRouter);
  app.use('/movies', movieRouter);
  app.use('/auth', authRouter);

  app.use(express.static(path.join(__dirname, '../client/build')));
  app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
  });



  app.listen(port);
  
  module.exports = app;
});
