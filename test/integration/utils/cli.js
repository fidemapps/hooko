var exec = require('child_process').exec;
var path = require('path');

/**
 * Run a cli command.
 *
 * @param {string} command
 * @param {function} cb
 */

exports.run = function (command, cb) {
  var hooko = path.join(__dirname, '../../../bin/hooko');
  return exec(hooko + ' ' + command, cb);
};
