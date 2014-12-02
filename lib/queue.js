var sqs = require('ya-sqs');
var config = require('./config');
var logger = require('./logger');

var queue = module.exports = sqs.createQueue(config.sqs);

queue.on('error', function (err) {
  logger.error('SQS queue error', err);
});
