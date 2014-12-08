var sqs = require('ya-sqs');
var _ = require('lodash');
var config = require('./config');
var logger = require('./logger');

var queues = {};

/**
 * Push a new message in a queue.
 *
 * @param {string} name
 * @param {object} message
 */

exports.push = function (name, message) {
  var queue = getOrCreateQueue(name);
  return queue.push(message);
};

/**
 * Pull messages from the queue.
 *
 * @param {function} fn
 */

exports.pull = function (fn) {
  var queue = getOrCreateQueue();
  return queue.pull(fn);
};

/**
 * Get or create a queue.
 *
 * @param {string} [name]
 * @returns {Queue}
 */

function getOrCreateQueue(name) {
  name = name || config.sqs.name;

  // Try to find the queue.
  if (queues[name]) return queues[name];

  // Create and return queue.
  queues[name] = createQueue({name: name});
  return queues[name];
}

/**
 * Create a new queue.
 *
 * @param {object} options
 * @returns {Queue}
 */

function createQueue(options) {
  options = _.defaults({}, options || {}, config.sqs);

  var queue = sqs.createQueue(options);

  queue.on('error', function (err) {
    logger.error('SQS queue error', err);
  });

  return queue;
}
