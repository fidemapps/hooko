var Promise = require('promise');
var Action = require('../models/action');
var config = require('../config');
var logger = require('../logger');

// Start the loop.
setTimeout(loop, 0); //Math.random() * config.scheduler.intervalTime);

/**
 * Loop of scheduler.
 */

function loop() {
  queueActions()
  .then(planNextLoop, planNextLoop);

  function planNextLoop() {
    setTimeout(loop, config.scheduler.intervalTime);
  }
}

/**
 * Queue actions.
 *
 * @returns {Promise}
 */

function queueActions() {
  return Action.find({state: 'failed'})
  .populate('bundle')
  .exec()
  .then(function (actions) {
    return Promise.all(
      actions
      .filter(isBundleActive)
      .map(function (action) {
        return action.addToQueue()
        .then(switchStateToActive);
      })
    );
  })
  .then(function (results) {
    logger.info('%d actions pushed in queue', results.length);
  }, function (err) {
    logger.error('Error queueing actions', err);
  });
}

/**
 * Test if the bundle of an action has the state active.
 *
 * @param {Action} action
 * @returns {boolean}
 */

function isBundleActive(action) {
  return action.bundle.state === 'active';
}

/**
 * Switch action state to active.
 */

function switchStateToActive(action) {
  action.state = 'active';
  return Promise.denodeify(action.save.bind(action))();
}
