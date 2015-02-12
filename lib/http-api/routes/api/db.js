var express = require('express');
var Promise = require('promise');
var _ = require('lodash');
var Bundle = require('../../../models/bundle');
var Action = require('../../../models/action');

/**
 * Create and expose router.
 */

var router = module.exports = new express.Router();

// reset database
router.post('/reset', function (req, res, next) {

  var bundleCriteria = {};
  if (req.query.prefix) {
    bundleCriteria.name = new RegExp('^' + req.query.prefix);
  }

  var bundles = [];

  Promise.denodeify(Bundle.find.bind(Bundle))(bundleCriteria)
    .then(function (existingBundles) {
      bundles = existingBundles;
      return Promise.denodeify(Bundle.remove.bind(Bundle))(bundleCriteria);
    }).then(function () {
      var promises = [];
      _.forEach(bundles, function (bundle) {
        promises.push(Promise.denodeify(Action.remove.bind(Action))({bundle: bundle._id}));
      });
      return Promise.all(promises);
    })
    .then(function () {
      res.status(200).json({status: 'success'});
    }, next);
});
