var express = require('express');
var ip = require('ip');
var bodyParser = require('body-parser');
var request = require('./utils/request');
var random = require('./utils/random');

describe('Scheduler', function () {
  var app, serverUrl, bundleName;

  before(function startServer(done) {
    app = express();
    app.use(bodyParser.text());
    app.listen(0, function () {
      serverUrl = 'http://' + ip.address() + ':' + this.address().port;
      done();
    });
  });

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

  it('should planify a failed action', function (done) {
    var call = 0;

    this.timeout(20000);

    app.post('/test', function (req, res) {
      // First call (action added)
      if (call === 0) {
        // Return 400 to put state to failed.
        res.status(400).send();
      }
      // Second call (action scheduled)
      else if (call === 1) {
        res.send();
        done();
      }

      call++;
    });

    request()
      .post('/api/actions')
      .send({bundle: bundleName, name: 'push', body: '{"test": "test"}'})
      .end(function (err) {
        if (err) return done(err);
      });
  });
});
