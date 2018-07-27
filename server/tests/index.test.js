import { describe, it } from 'mocha';
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../index';

chai.should();
chai.use(chaiHttp);

describe('GET /api/v1', () => {
  it('should return 200 when the base url is requested', (done) => {
    chai.request(server).get('/api/v1')
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.a('object');
        res.body.should.have.property('status').eql('success');
        res.body.should.have.have.property('message').eql('Welcome to Shopmon API version 1');
        done();
      });
  });

  it('should return 404 when an unavailable route is requested', (done) => {
    chai.request(server).get('/api/v1/ok')
      .end((err, res) => {
        res.should.have.status(404);
        res.should.be.a('object');
        res.body.should.have.property('status').eql('fail');
        res.body.should.have.have.property('message').eql('Route unavailable on this server');
        done();
      });
  });
});
