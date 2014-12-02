var Promise = require('promise');
var queue = require('../queue');
var Action = require('../models/action');
var requester = require('./requester');
var logger = require('../logger');

queue.pull(function (message) {
  return Action.findById(message.id)
  .populate({
    path: 'bundle',
    select: 'state hooks'
  })
  .exec()
  .then(function (action) {
    // If there is no action, do nothing.
    if (!action) {
      logger.warn('Action not found');
      return;
    }

    // If bundle is paused, do nothing.
    if (action.state === 'paused') {
      logger.info('Action in paused');
      return;
    }

    var hooks = action.bundle.hooks.filter(function (hook) {
      return hook.name === action.name;
    });

    var requests = hooks.map(function (hook) {
      return requester.request(hook.url, action.data);
    });

    return Promise.all(requests)
    .then(function () {
      logger.info('Requests complete for action (id: %s)', action._id);
      action.set({state: 'complete'});
    })
    .catch(function () {
      logger.info('Requests fail for action (id: %s)', action._id);
      action.set({state: 'failed'});
    })
    .then(function () {
      return Promise.denodeify(action.save.bind(action))()
      .then(function () {
        logger.info('Action saved', action._id);
      });
    });
  });
});
