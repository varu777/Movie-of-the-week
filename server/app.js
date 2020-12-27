const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');

const port = 9000;
require('dotenv').config()

const router = require('./routes/index');

app.listen(port);

app.use(cors({credentials: true, origin: 'https://movieotw.herokuapp.com/'}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'https://movieotw.herokuapp.com/');
    res.header(
      'Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization,  X-PINGOTHER'
    );
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS');
    next();
});

app.use('/', router);

app.use(express.static(path.join(__dirname, '../client/build')));
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

module.exports = app;
