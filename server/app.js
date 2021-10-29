require('dotenv').config()
const express  = require('express');
const app   = express();
const session = require('express-session');
const MongoStore = require('connect-mongo');
const path = require('path');
const cors = require('cors');
const port = process.env.PORT || 9000;
const mongoUtil = require('./utils/mongoUtil');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');


/* establishing database connection */
mongoUtil.connectToServer(function(err, client) {
  // report error if one exists
  if (err) {
    console.log("App startup failed | Unable to connect to database server: " + err.toString());
    return;
  }

  console.log("App starting | Requiring necessary routes...");
  const userRouter = require('./routes/user/index');
  const movieRouter = require('./routes/movies/index');
  const authRouter = require('./routes/auth/index');

  /* Redirect http to https */
  console.log("App starting | Determining whether to redirect http to https...");
  app.get('*', function(req, res, next) {
    if (req.headers['x-forwarded-proto'] !== 'https' && process.env.NODE_ENV === 'production') {
      console.log('https://' + req.hostname + req.url);
      res.redirect('https://' + req.hostname + req.url);
    }
    else
      next() /* Continue to other routes if we're not redirecting */
  });

  console.log("App starting | Setting up cors policy...");
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

  console.log("App starting | Configuring body parser...");
  app.use(cookieParser('hi'));
  app.use(bodyParser.json()); 
  app.use(bodyParser.urlencoded({ extended: false }));

  console.log("App starting | Creating mongodb session...");
  app.use(session({
    secret: 'hi',
    saveUninitialized: false,
    resave: false, // TODO: look into whether store uses touch method 
    cookie: {maxAge: 18144e5}, // 3 weeks
    store: MongoStore.create({
      mongoUrl: process.env.DB_CONNECTION_URL,
    })
  }));

  // logs incoming requests
  app.use("*", function (req, res, next) {
      const requestData = req.method === "GET" ? "" : " DATA: " + JSON.stringify(req.body);
      console.log("Request received | " + req.method + " " + req.originalUrl  + requestData);
      next();
  });

  console.log("App starting | Setting up passport...");
  const passport = require('./passport/setup');
  app.use(passport.initialize());
  app.use(passport.session());

  console.log("App starting | Setting up routes...");
  app.use('/user', userRouter);
  app.use('/movies', movieRouter);
  app.use('/auth', authRouter);

  console.log("App starting | Getting client files...");
  app.use(express.static(path.join(__dirname, '../client/build')));
  app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
  });

  console.log("App starting | Listening to port: " + port);
  app.listen(port);

  console.log("App startup completed. Now listening for requests.");
  module.exports = app;
});
