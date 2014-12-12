var express = require('express');
var errorHandler = require('express-err');
var cors = require('cors');
var bunyanRequest = require('bunyan-request');
var logger = require('../logger');
var validationErrorStatus = require('./middlewares/validation-error-status');
var errorLogger = require('./middlewares/error-logger');

/**
 * Create and expose express application.
 */

var app = module.exports = express();

// Log requests.
if (process.env.NODE_ENV !== 'development')
  app.use(bunyanRequest({logger: logger}));

// Enable cors.
app.use(cors());

// Routes.
app.use('/api', require('./routes/api'));

// Redirect other routes to 404.
app.use(errorHandler.httpError(404));

// Change the status of validation error to 400.
app.use(validationErrorStatus(400));

// Log errors.
app.use(errorLogger());

// Handle errors.
app.use(errorHandler({formatters: ['json', 'text']}));
