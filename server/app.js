const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
require('dotenv').config()

const port = process.env.PORT || 9000;

const router = require('./routes/index');
/* Redirect http to https */
app.get('*', function(req, res, next) {
  if (req.headers['x-forwarded-proto'] != 'https' && process.env.NODE_ENV === 'production')
    res.redirect('https://' + req.hostname + req.url)
  else
    next() /* Continue to other routes if we're not redirecting */
});

app.use(cors({credentials: true, origin: 'https://movieotw.herokuapp.com/'}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', router);


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'https://movieotw.herokuapp.com/');
    res.header(
      'Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization,  X-PINGOTHER'
    );
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS');
    next();
});




app.use(express.static(path.join(__dirname, './build')));
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, './build', 'index.html'));
});



app.listen(port);
module.exports = app;
