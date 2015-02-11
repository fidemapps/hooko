var request = require('superagent');
var Promise = require('promise');
var logger = require('../logger');

/**
 * Make a request.
 *
 * @param {string} url
 * @param {object} options
 * @returns {Promise}
 */

exports.request = function (url, options) {
  return new Promise(function (resolve, reject) {
    logger.info('Run request to %s', url);

    request
    .post(url)
    .send(options.body)
    .set(options.headers || {})
    .end(function (err, res) {
      if (err) return reject(err);
      if (res.error) return reject(res.error);
      resolve();
    });
  });
};
