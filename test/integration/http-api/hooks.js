var expect = require('chai').expect;
var request = require('../utils/request');
var random = require('../utils/random');

describe('HTTP API hooks', function () {
  describe('POST /api/bundles/:bundle/hooks', function () {
    var bundle;

    before(function addBundle(done) {
      bundle = random.bundle();

      request()
        .post('/api/bundles')
        .send({name: bundle})
        .end(done);
    });

    it('should return an error without name', function (done) {
      request()
        .post('/api/bundles/' + bundle + '/hooks')
        .send({})
        .expect(400)
        .expect(function (res) {
          expect(res).to.have.deep.property('body.error.message', 'Validation failed');
        })
        .end(done);
    });

    it('should add the hook', function (done) {
      request()
        .post('/api/bundles/' + bundle + '/hooks')
        .send({name: 'hook01', url: 'http://google.com'})
        .expect(201)
        .end(done);
    });
  });

  describe('GET /api/bundles/:bundle/hooks', function () {
    var hook, bundle;

    before(function addBundle(done) {
      bundle = random.bundle();

      request()
        .post('/api/bundles')
        .send({name: bundle})
        .end(done);
    });

    before(function addHook(done) {
      hook = random.hook();

      request()
        .post('/api/bundles/' + bundle + '/hooks')
        .send({name: hook, url: 'http://google.com'})
        .end(done);
    });

    it('should list hooks', function (done) {
      request()
        .get('/api/bundles/' + bundle + '/hooks')
        .expect(200)
        .expect(function (res) {
          expect(res).to.have.deep.property('body[0].name', hook);
        })
        .end(done);
    });
  });

  describe('PATCH /api/bundles/:bundle/hooks/:id', function () {
    var hook, hookId, bundle;

    before(function addBundle(done) {
      bundle = random.bundle();

      request()
        .post('/api/bundles')
        .send({name: bundle})
        .end(done);
    });

    before(function addHook(done) {
      hook = random.hook();

      request()
        .post('/api/bundles/' + bundle + '/hooks')
        .send({name: hook, url: 'http://google.com'})
        .end(function (err, res) {
          if (err) return done(err);
          hookId = res.body[0]._id;
          done();
        });
    });

    it('should return an error without name', function (done) {
      request()
        .patch('/api/bundles/' + bundle + '/hooks/' + hookId)
        .send({name: null})
        .expect(400)
        .expect(function (res) {
          expect(res).to.have.deep.property('body.error.message', 'Validation failed');
        })
        .end(done);
    });

    it('should update the hook', function (done) {
      var newHookName = random.hook();

      request()
        .patch('/api/bundles/' + bundle + '/hooks/' + hookId)
        .send({name: newHookName})
        .expect(200)
        .expect(function (res) {
          expect(res).to.have.deep.property('body.name', newHookName);
        })
        .end(done);
    });
  });

  describe('GET /api/bundles/:bundle/hooks/:id/summary', function () {
    var hook, hookId, bundle;

    before(function addBundle(done) {
      bundle = random.bundle();

      request()
        .post('/api/bundles')
        .send({name: bundle})
        .end(done);
    });

    before(function addHook(done) {
      hook = random.hook();

      request()
        .post('/api/bundles/' + bundle + '/hooks')
        .send({name: hook, url: 'http://google.com'})
        .end(function (err, res) {
          if (err) return done(err);
          hookId = res.body[0]._id;
          done();
        });
    });

    it('should return an error if hook id does not exist', function (done) {
      request()
        .get('/api/bundles/' + bundle + '/hooks/non-existent/summary')
        .expect(400)
        .end(done);
    });

    it('should get the hook summary', function (done) {
      var newHookName = random.hook();

      request()
        .get('/api/bundles/' + bundle + '/hooks/' + hookId + '/summary')
        .expect(200)
        .expect(function (res) {
          expect(res).to.have.deep.property('body.failed', 0);
          expect(res).to.have.deep.property('body.completed', 0);
          expect(res).to.have.deep.property('body.active', 0);
        })
        .end(done);
    });
  });

  describe('DELETE /api/bundles/:name', function () {
    var hook, hookId, bundle;

    before(function addBundle(done) {
      bundle = random.bundle();

      request()
        .post('/api/bundles')
        .send({name: bundle})
        .end(done);
    });

    before(function addHook(done) {
      hook = random.hook();

      request()
        .post('/api/bundles/' + bundle + '/hooks')
        .send({name: hook, url: 'http://google.com'})
        .end(function (err, res) {
          if (err) return done(err);
          hookId = res.body[0]._id;
          done();
        });
    });

    it('should destroy the bundle and return an empty list', function (done) {
      request()
        .delete('/api/bundles/' + bundle + '/hooks/' + hookId)
        .expect(200)
        .end(function (err) {
          if (err) return done(err);

          request()
            .get('/api/bundles/' + bundle + '/hooks')
            .expect(200)
            .expect(function (res) {
              expect(res.body).to.length(0);
            })
            .end(done);
        });
    });
  });
});
