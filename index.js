const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const movies = require('./routes/movies');
const users = require('./routes/users');
const mongoose = require('./config/database'); //database configuration
var jwt = require('jsonwebtoken');
const app = express();
require('dotenv').config();

app.use(bodyParser.json());

app.set('secretKey', 'nodeRestApi'); // jwt secret token
// connection to mongodb
mongoose.connection.on(
  'error',
  console.error.bind(console, 'MongoDB connection error:')
);

mongoose.connection.once('open', () => {
  console.log('DB Connected');
});

// public route
app.use('/users', users);

// private route
app.use('/movies', validateUser, movies);

app.use(logger('dev'));

function validateUser(req, res, next) {
  jwt.verify(req.headers['x-access-token'], req.app.get('secretKey'), function(
    err,
    decoded
  ) {
    if (err) {
      res.json({ status: 'error', message: err.message, data: null });
    } else {
      // add user id to request
      req.body.userId = decoded.id;
      next();
    }
  });
}

// express doesn't consider not found 404 as an error so we need to handle 404 explicitly
// handle 404 error
app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// handle errors
app.use(function(err, req, res, next) {
  console.log(err);

  if (err.status === 404) res.status(404).json({ message: 'Not found' });
  else res.status(500).json({ message: 'Something looks wrong :( !!!' });
});

const port = process.env.PORT || 5000;

app.listen(port, function() {
  console.log('Node server listening on port ' + port);
});
