import { } from 'dotenv/config';
import { describe, it } from 'mocha';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

chai.should();
chai.use(chaiHttp);

const user = {
  username: 'drille',
  password: 'Password123',
};

describe('POST /api/v1/auth/login Login a user', () => {
  it('should return 200 when the login was successful', (done) => {
    chai.request(app).post('/api/v1/auth/login')
      .send(user)
      .end((req, res) => {
        res.status.should.eql(200);
        res.body.should.be.a('object');
        res.body.should.have.property('status').eql('success');
        res.body.should.have.property('user');
        res.body.user.should.be.a('object');
        res.body.user.should.have.property('email');
        res.body.user.should.have.property('username');
        res.body.user.should.have.property('businessSlug');
        res.body.user.should.have.property('position');
        res.body.user.should.have.property('role');
        res.body.user.should.have.property('imageUrl');
        res.body.should.have.property('message').eql('Your login was successful.');
        done();
      });
  });

  it('should return 400 when the email is not valid', (done) => {
    chai.request(app).post('/api/v1/auth/login')
      .send({ email: 'usertest' })
      .end((req, res) => {
        res.status.should.eql(400);
        res.body.should.be.a('object');
        res.body.should.have.property('errors');
        res.body.errors.should.be.a('object');
        res.body.errors.should.have.property('email').include('The email format is invalid.');
        done();
      });
  });

  it('should return 400 when the password is not provided', (done) => {
    chai.request(app).post('/api/v1/auth/login')
      .send({ email: 'usertest@mail.com' })
      .end((req, res) => {
        res.status.should.eql(400);
        res.body.should.be.a('object');
        res.body.should.have.property('errors');
        res.body.errors.should.be.a('object');
        res.body.errors.should.have.property('password').include('The password field is required.');
        done();
      });
  });

  it('should return 401 when no user with the username exists', (done) => {
    chai.request(app).post('/api/v1/auth/login')
      .send({ username: 'ogui', password: 'Password1' })
      .end((req, res) => {
        res.status.should.eql(401);
        res.body.should.be.a('object');
        res.body.should.have.property('errors');
        res.body.errors.should.be.a('object');
        res.body.errors.should.have.property('username').include('No user with ogui exists.');
        res.body.should.have.property('message').eql('Your login failed.');
        done();
      });
  });

  it('should return 401 when no user with the email exists', (done) => {
    chai.request(app).post('/api/v1/auth/login')
      .send({ email: 'ogui@test.com', password: 'Password123' })
      .end((req, res) => {
        res.status.should.eql(401);
        res.body.should.be.a('object');
        res.body.should.have.property('errors');
        res.body.errors.should.be.a('object');
        res.body.errors.should.have.property('email').include('No user with ogui@test.com exists.');
        res.body.should.have.property('message').eql('Your login failed.');
        done();
      });
  });

  it('should return 401 when the password is incorrect', (done) => {
    chai.request(app).post('/api/v1/auth/login')
      .send({ username: 'bobby', password: 'Password1' })
      .end((req, res) => {
        res.status.should.eql(401);
        res.body.should.be.a('object');
        res.body.should.have.property('errors');
        res.body.errors.should.be.a('object');
        res.body.errors.should.have.property('password').include('The password is incorrect.');
        res.body.should.have.property('message').eql('Your login failed.');
        done();
      });
  });

  it('should return 401 when the account is not yet verified', (done) => {
    chai.request(app).post('/api/v1/auth/login')
      .send({ username: 'johnny', password: 'Password123' })
      .end((req, res) => {
        res.status.should.eql(401);
        res.body.should.be.a('object');
        res.body.should.have.property('errors');
        res.body.errors.should.be.a('object');
        res.body.errors.should.have.property('email').include('You have to verify your email before you can login.');
        res.body.should.have.property('message').eql('Your login failed.');
        done();
      });
  });
});
