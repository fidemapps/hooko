var request = require('superagent');
var Promise = require('promise');
var logger = require('../logger');

exports.request = function (url, data) {
  return new Promise(function (resolve, reject) {
    logger.info('Run request to %s', url);

    request
    .post(url)
    .send(data)
    .end(function (err, res) {
      if (err) return reject(err);
      if (res.error) return reject(res.error);
      resolve();
    });
  });
};
