var express = require('express');
var errorHandler = require('express-err');
var bunyanRequest = require('bunyan-request');
var logger = require('../logger');
var db = require('../db');

/**
 * Create and expose express application.
 */

var app = module.exports = express();

// Log requests.
if (process.env.NODE_ENV !== 'development')
  app.use(bunyanRequest({logger: logger}));

// Routes.
app.use('/api', require('./routes/api'));

// Redirect other routes to 404.
app.use(errorHandler.httpError(404));

app.use(function (err, req, res, next) {
  if (err instanceof db.Error.ValidationError) err.status = 400;
  next(err);
});

// Handle errors.
app.use(errorHandler({formatters: ['json', 'text']}));
