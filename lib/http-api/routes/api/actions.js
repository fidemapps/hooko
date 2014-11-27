var express = require('express');
var Promise = require('bluebird');
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

  // Try to find bundle.
  if (body.bundle)
    promise = Bundle.findOne({name: body.bundle}).exec()
      .then(function (bundle) {
        if (!bundle) throw error('Bundle not found');
        body.bundle = bundle._id;
      });

  // Create and insert action.
  promise
  .then(function () {
    return Action.create(body);
  })
  .then(function (action) {
    return Promise.promisify(action.populate, action)('bundle');
  })
  .then(function (action) {
    res.status(201).send(action);
  }, next);
});
