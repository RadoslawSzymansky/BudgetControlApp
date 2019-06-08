const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const config = require('./config/index')
const mongoose = require('mongoose');

// routers
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const apiRouter = require('./routes/api');
/// nowe ustawienia: 


var app = express();
/// connecting mongo db
mongoose.connect(config.db, { useNewUrlParser: true });
// sprawdzanie polacznenia
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Połaczone z mongo DB!')
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api', apiRouter)

// nadpisane
// app.use(express.static(path.join(__dirname, 'client/build')));
// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static(path.join(__dirname, 'client/build')));
//   app.get('*', (req, res) => { res.sendfile(path.join(__dirname = 'client/build/index.html')); })
// }
// app.get('*', (req, res) => { res.sendFile(path.join(__dirname + '/client/public/index.html')); })


if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}



module.exports = app;
