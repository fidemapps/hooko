var express = require('express');
var Promise = require('bluebird');
var Bundle = require('../../../models/bundle');

/**
 * Create and expose router.
 */

var router = module.exports = express.Router();

// list
router.get('/', function (req, res, next) {
  Bundle.find().exec()
  .then(function (bundles) {
    res.send(bundles);
  }, next);
});

// create
router.post('/', function (req, res, next) {
  Bundle.create(req.body)
  .then(function (bundle) {
    res.status(201).send(bundle);
  }, next);
});

// update
router.patch('/:name', function (req, res, next) {
  Bundle.findOne({name: req.params.name}).exec()
  .then(function (bundle) {
    bundle.set(req.body);
    return Promise.promisify(bundle.save.bind(bundle))();
  }, next)
  .then(function (bundle) {
    res.send(bundle[0]);
  }, next);
});

// destroy
router.delete('/:name', function(req, res, next) {
  Bundle.findOneAndRemove({name: req.params.name}).exec()
  .then(function () {
    res.send();
  }, next);
});
