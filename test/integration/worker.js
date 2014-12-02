var express = require('express');
var request = require('./utils/request');

describe('Worker', function () {
  var app, serverUrl, bundleName;

  before(function generateRandomBundleName() {
    bundleName = 'worker-test-bundle-' + Math.round(Math.random() * 5000);
  });

  before(function startServer(done) {
    app = express();
    app.listen(0, function () {
      serverUrl = 'http://' + this.address().address + ':' + this.address().port;
      done();
    });
  });

  before(function addBundle(done) {
    request()
      .post('/api/bundles')
      .send({name: bundleName})
      .end(done);
  });

  before(function addHook(done) {
    request()
      .post('/api/bundles/' + bundleName + '/hooks')
      .send({name: 'push', url: serverUrl + '/test'})
      .end(done);
  });

  describe('make request', function () {
    it('should make a request', function (done) {
      this.timeout(5000);

      app.post('/test', function (req, res) {
        res.send('OK');
        done();
      });

      request()
      .post('/api/actions')
      .send({bundle: bundleName, name: 'push', body: 'test'})
      .end(function (err) {
        if (err) return done(err);
      });
    });
  });
});
