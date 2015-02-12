'use strict';

var _ = require('lodash');

/**
 * Create a new error.
 *
 * @param {object|string} options
 * @returns {Error}
 */

module.exports = function (options) {
  // Support error('message');
  if (_.isString(options)) options = {message: options};

  // Defaults status to 400.
  options = _.defaults(options, {
    status: 400
  });

  // Create and extend error.
  return _.extend(new Error(), options);
};
