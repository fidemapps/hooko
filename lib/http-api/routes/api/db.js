var express = require('express');
var Promise = require('promise');
var Bundle = require('../../../models/bundle');
var Action = require('../../../models/action');

/**
 * Create and expose router.
 */

var router = module.exports = new express.Router();

// reset database
router.post('/reset', function (req, res, next) {
  Promise.denodeify(Bundle.remove.bind(Bundle))({})
    .then(function () {
      return Promise.denodeify(Action.remove.bind(Action))({});
    })
    .then(function () {
      res.status(200).send({status: 'success'});
    }, next);
});
