import chai from 'chai';
import { describe, it, before } from 'mocha';
import chaiHttp from 'chai-http';
import JwtHelper from '../services/JwtHelper';
import app from '../index';

chai.should();
chai.use(chaiHttp);


const inValidToken = 'XQiOjE1MzMxNjgxMjMsImV4cCI6MTUzMzQyNzMyM30.1D8DUmERbtKF9g7PPbufB0CV9mOFO7It2eWe_9Lw5tw';
let token;
const user = {
  email: 'johnny@gmail.com',
};
describe('GET /api/v1/auth/verify Activates a user account', () => {
  before(async () => {
    token = await JwtHelper.signToken({ user }, '1hr');
  });

  it('should verify a user profile when token is valid', (done) => {
    chai.request(app).get(`/api/v1/auth/verify?token=${token}`)
      .end((req, res) => {
        res.status.should.eql(200);
        res.body.should.be.a('object');
        res.body.should.have.property('status').eql('success');
        res.body.should.have.property('message').eql('Your account has been activated succssfully.');
        done();
      });
  });

  it('should return 401 when the token is invalid', (done) => {
    chai.request(app).get(`/api/v1/auth/verify?token=${inValidToken}`)
      .end((req, res) => {
        res.status.should.eql(401);
        res.body.should.be.a('object');
        res.body.should.have.property('status').eql('fail');
        res.body.should.have.property('errors');
        res.body.errors.should.be.a('object');
        res.body.errors.should.have.property('email').include('The activation link has expired please provide your email.');
        done();
      });
  });
});

describe('POST /api/v1/auth/verify Resend Verification link', () => {
  it('should resend the verification link when account exists', (done) => {
    chai.request(app).post('/api/v1/auth/verify')
      .send({ email: user.email })
      .end((req, res) => {
        res.status.should.eql(200);
        res.body.should.be.a('object');
        res.body.should.have.property('status').eql('success');
        res.body.should.have.property('message').eql('Verification link has been sent to your email address.');
        done();
      });
  });

  it('should return 404 when account does not exist', (done) => {
    chai.request(app).post('/api/v1/auth/verify')
      .send({ email: 'no.user@bad.com' })
      .end((req, res) => {
        res.status.should.eql(404);
        res.body.should.be.a('object');
        res.body.should.have.property('status').eql('fail');
        res.body.should.have.property('errors');
        res.body.errors.should.be.a('object');
        res.body.errors.should.have.property('email').include('User with the email: no.user@bad.com does not exist.');
        done();
      });
  });

  it('should return 400 when the email is not included', (done) => {
    chai.request(app).post('/api/v1/auth/verify')
      .end((req, res) => {
        res.status.should.eql(400);
        res.body.should.be.a('object');
        res.body.should.have.property('status').eql('error');
        res.body.should.have.property('errors');
        res.body.errors.should.be.a('object');
        res.body.errors.should.have.property('email').include('The email field is required.');
        done();
      });
  });

  it('should return 400 when the email is not valid', (done) => {
    chai.request(app).post('/api/v1/auth/verify')
      .send({ email: 'no.usercom' })
      .end((req, res) => {
        res.status.should.eql(400);
        res.body.should.be.a('object');
        res.body.should.have.property('status').eql('error');
        res.body.should.have.property('errors');
        res.body.errors.should.be.a('object');
        res.body.errors.should.have.property('email').include('The email format is invalid.');
        done();
      });
  });
});
