'use strict';

var Promise = require('promise');
var db = require('../db');
var queue = require('../queue');
var logger = require('../logger');
require('./bundle');

var actionSchema = new db.Schema({
  name: {type: String, required: true},
  bundle: {type: db.Schema.Types.ObjectId, ref: 'Bundle'},
  body: {type: String, default: ''},
  headers: {type: Object, default: {}},
  state: {type: String, default: 'active', enum: ['completed', 'failed', 'active']}
});

actionSchema.statics.countByState = function (bundleId, name, state) {
  return Promise.denodeify(this.count.bind(this))({bundle: bundleId, name: name, state: state});
};

/**
 * Add the action to queue.
 *
 * @returns {Promise}
 */

actionSchema.methods.addToQueue = function () {
  var action = this;

  return queue.push(this.bundle.queueName, {id: action._id})
    .then(function () {
      return action;
    }, function (err) {
      logger.error('Error adding action to queue', action);
      throw err;
    });
};

/**
 * Create and expose model.
 */

module.exports = db.model('Action', actionSchema);
