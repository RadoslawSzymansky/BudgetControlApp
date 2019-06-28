const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const config = require('./config/index')
const mongoose = require('mongoose');

// routers
const apiRouter = require('./routes/api');


var app = express();

/// connecting mongo db
mongoose.connect(config.db, { useNewUrlParser: true });

// sprawdzanie polacznenia
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Połaczone z mongo DB!');
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// routes
app.use('/api', apiRouter)


if (process.env.NODE_ENV === 'production') {
  // Set static folder for prod mode. (react, bo inaczej bedzie wyswietlac to co express zaserwuje!)
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

module.exports = app;
