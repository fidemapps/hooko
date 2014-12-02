/**
 * Generate a random bundle name.
 *
 * @returns {string}
 */

exports.bundle = function () {
  return 'test-bundle-' + Math.round(Math.random() * 100000);
};


/**
 * Generate a random hook name.
 *
 * @returns {string}
 */

exports.hook = function () {
  return 'test-hook-' + Math.round(Math.random() * 100000);
};
