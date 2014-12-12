var express = require('express');
var Promise = require('promise');
var Bundle = require('../../../models/bundle');
var error = require('../../error');

/**
 * Create and expose router.
 */

var router = module.exports = new express.Router();

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
    if (!bundle) throw error('Bundle not found');
    bundle.set(req.body);
    return Promise.denodeify(bundle.save.bind(bundle))();
  })
  .then(function (bundle) {
    res.send(bundle);
  }, next);
});

// destroy
router.delete('/:name', function(req, res, next) {
  Bundle.findOneAndRemove({name: req.params.name}).exec()
  .then(function () {
    res.send();
  }, next);
});
