'use strict';

var mongoose = require('mongoose');

/**
 * Middleware used to change the status of
 * a validation error from Mongoose.
 *
 * @param {number} status
 *
 * @example
 * app.use(validationErrorStatus(400));
 */

module.exports = function (status) {
  return function (err, req, res, next) {
    if (err instanceof mongoose.Error.ValidationError) err.status = status;
  next(err);
  };
};
