var express = require('express');
var Promise = require('promise');
var error = require('../../error');
var Bundle = require('../../../models/bundle');
var Action = require('../../../models/action');

/**
 * Create and expose router.
 */

var router = module.exports = express.Router();

// create
router.post('/', function (req, res, next) {
  var body = req.body;
  var promise = Promise.resolve();
  var bundle;

  // Try to find bundle.
  if (body.bundle)
    promise = Bundle.findOne({name: body.bundle}).exec()
      .then(function (_bundle) {
        if (!_bundle) throw error('Bundle not found');
        if (_bundle.state === 'stopped') throw error('Bundle stopped');
        bundle = _bundle;
        body.bundle = bundle._id;
      });

  // Create and insert action.
  promise
  .then(function () {
    return Action.create(body);
  })
  .then(function (action) {
    return Promise.denodeify(action.populate.bind(action))('bundle');
  })
  .then(function (action) {
    return action.addToQueue();
  })
  .then(function (action) {
    res.status(201).send(action);
  }, next);
});
