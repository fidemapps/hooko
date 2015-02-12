'use strict';

var logger = require('../../logger');

/**
 * Middleware that log errors.
 */

module.exports = function () {
  return function (err, req, res, next) {
    logger.error('Express error', err);
    next(err);
  };
};
