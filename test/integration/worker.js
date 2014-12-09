var expect = require('chai').expect;
var express = require('express');
var ip = require('ip');
var bodyParser = require('body-parser');
var request = require('./utils/request');
var random = require('./utils/random');

describe('Worker', function () {
  var app, serverUrl;

  before(function startServer(done) {
    app = express();
    app.use(bodyParser.text());
    app.listen(0, function () {
      serverUrl = 'http://' + ip.address() + ':' + this.address().port;
      done();
    });
  });

  describe('with the default queue', function () {
    var bundleName;

    before(function generateRandomBundleName() {
      bundleName = random.bundle();
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

  describe('with the a custom queue', function () {
    var bundleName;

    before(function generateRandomBundleName() {
      bundleName = random.bundle();
    });

    before(function addBundle(done) {
      request()
        .post('/api/bundles')
        .send({name: bundleName, queueName: 'hooko-custom'})
        .end(done);
    });

    before(function addHook(done) {
      request()
        .post('/api/bundles/' + bundleName + '/hooks')
        .send({name: 'push', url: serverUrl + '/test-custom'})
        .end(done);
    });

    it('should make a request', function (done) {
      this.timeout(5000);

      app.post('/test-custom', function (req, res) {
        expect(req.body).to.equal('test');
        expect(req.get('x-custom')).to.equal('foo');
        res.send('OK');
        done();
      });

      request()
      .post('/api/actions')
      .send({
        bundle: bundleName,
        name: 'push',
        body: 'test',
        headers: {
          'content-type': 'text/plain',
          'x-custom': 'foo'
        }
      })
      .end(function (err) {
        if (err) return done(err);
      });
    });
  });
});
