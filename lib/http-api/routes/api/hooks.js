'use strict';

var express = require('express');
var Promise = require('promise');
var Bundle = require('../../../models/bundle');
var Action = require('../../../models/action');
var error = require('../../error');

/**
 * Create and expose router.
 */

var router = module.exports = new express.Router();

// Attach req.bundle to every request.
router.param('bundle', function (req, res, next, bundle) {
  Bundle.findOne({name: bundle}).select('hooks').exec()
    .then(function (bundle) {
      if (!bundle) throw error('Bundle not found');
      req.bundle = bundle;
      next();
    }, next);
});

// list
router.get('/:bundle/hooks', function (req, res) {
  res.send(req.bundle.hooks);
});

// summary
router.get('/:bundle/hooks/:id/summary', function (req, res, next) {
  var hook = req.bundle.hooks.id(req.params.id);
  if (!hook) {
    return res.status(400).json({message: 'Hook not found'});
  }

  Promise.all([
    Action.countByState(req.bundle._id, hook.name, 'active'),
    Action.countByState(req.bundle._id, hook.name, 'failed'),
    Action.countByState(req.bundle._id, hook.name, 'completed')
  ]).then(function (results) {
    res.status(200).json({active: results[0], failed: results[1], completed: results[2]});
  });
});

// create
router.post('/:bundle/hooks', function (req, res, next) {
  req.bundle.hooks.push(req.body);
  Promise.denodeify(req.bundle.save.bind(req.bundle))()
    .then(function (bundle) {
      res.status(201).send(bundle.hooks);
    }, next);
});

// update
router.patch('/:bundle/hooks/:id', function (req, res, next) {
  var hook = req.bundle.hooks.id(req.params.id);
  if (!hook) {
    return res.status(400).json({message: 'Hook not found'});
  }
  hook.set(req.body);
  Promise.denodeify(req.bundle.save.bind(req.bundle))()
    .then(function () {
      res.send(hook);
    }, next);
});

// destroy
router.delete('/:bundle/hooks/:id', function (req, res, next) {
  var hook = req.bundle.hooks.id(req.params.id);
  if (!hook) return res.send();
  hook.remove();
  Promise.denodeify(req.bundle.save.bind(req.bundle))()
    .then(function () {
      res.send();
    }, next);
});
