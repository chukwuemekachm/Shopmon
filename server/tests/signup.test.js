import { } from 'dotenv/config';
import { describe, it } from 'mocha';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

chai.should();
chai.use(chaiHttp);

const user = {
  email: 'usertest@gmail.com',
  username: 'usertetst',
  businessName: 'test user business',
  businessAddress: 'No. 345 white house lane, Aba.',
  password: 'Password123',
  confirmPassword: 'Password123',
};

describe('POST /api/v1/auth/signup Creates a new business', () => {
  it('should return 200 when the business was created successfully', (done) => {
    chai.request(app).post('/api/v1/auth/signup')
      .send(user)
      .end((req, res) => {
        res.status.should.eql(201);
        res.body.should.be.a('object');
        res.body.should.have.property('status').eql('success');
        res.body.should.have.property('business');
        res.body.business.should.be.a('object');
        res.body.business.should.have.property('email');
        res.body.business.should.have.property('username');
        res.body.business.should.have.property('businessSlug');
        res.body.business.should.have.property('position');
        res.body.business.should.have.property('role');
        res.body.business.should.have.property('imageUrl');
        res.body.should.have.property('message').eql('Your account was created successfull and a Verification link has been sent to your email address.');
        done();
      });
  });

  it('should return 400 when the email is not valid', (done) => {
    chai.request(app).post('/api/v1/auth/signup')
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

  it('should return 400 when the username is not provided', (done) => {
    chai.request(app).post('/api/v1/auth/signup')
      .send({ email: 'usertest@mail.com' })
      .end((req, res) => {
        res.status.should.eql(400);
        res.body.should.be.a('object');
        res.body.should.have.property('errors');
        res.body.errors.should.be.a('object');
        res.body.errors.should.have.property('username').include('The username field is required.');
        done();
      });
  });

  it('should return 400 when the businessName is not provided', (done) => {
    chai.request(app).post('/api/v1/auth/signup')
      .send({ email: 'usertest@mail.com' })
      .end((req, res) => {
        res.status.should.eql(400);
        res.body.should.be.a('object');
        res.body.should.have.property('errors');
        res.body.errors.should.be.a('object');
        res.body.errors.should.have.property('businessName').include('The businessName field is required.');
        done();
      });
  });

  it('should return 400 when the businessAddress is not provided', (done) => {
    chai.request(app).post('/api/v1/auth/signup')
      .send({ email: 'usertest@mail.com' })
      .end((req, res) => {
        res.status.should.eql(400);
        res.body.should.be.a('object');
        res.body.should.have.property('errors');
        res.body.errors.should.be.a('object');
        res.body.errors.should.have.property('businessAddress').include('The businessAddress field is required.');
        done();
      });
  });

  it('should return 400 when the password is not provided', (done) => {
    chai.request(app).post('/api/v1/auth/signup')
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

  it('should return 400 when the confirmPassword is not provided', (done) => {
    chai.request(app).post('/api/v1/auth/signup')
      .send({ email: 'usertest@mail.com' })
      .end((req, res) => {
        res.status.should.eql(400);
        res.body.should.be.a('object');
        res.body.should.have.property('errors');
        res.body.errors.should.be.a('object');
        res.body.errors.should.have.property('confirmPassword').include('The confirmPassword field is required.');
        done();
      });
  });

  it('should return 400 when the password and the confirmPassword do not match', (done) => {
    chai.request(app).post('/api/v1/auth/signup')
      .send({
        password: 'Password12',
        confirmPassword: 'Password13',
      })
      .end((req, res) => {
        res.status.should.eql(400);
        res.body.should.be.a('object');
        res.body.should.have.property('errors');
        res.body.errors.should.be.a('object');
        res.body.errors.should.have.property('confirmPassword').include('The confirmPassword and password fields must match.');
        done();
      });
  });

  it('should return 400 when the password does not contain an upper and lower case letter and a number', (done) => {
    chai.request(app).post('/api/v1/auth/signup')
      .send({
        email: 'usertest@mail.com',
        username: 'usertest',
        businessName: 'test user business',
        businessAddress: 'No. 345 white house lane, Aba.',
        password: 'Password',
        confirmPassword: 'Password',
      })
      .end((req, res) => {
        res.status.should.eql(400);
        res.body.should.be.a('object');
        res.body.should.have.property('errors');
        res.body.errors.should.be.a('object');
        res.body.errors.should.have.property('password').include('Password must contain an Upper case letter, a lower case letter and a number.');
        done();
      });
  });

  it('should return 409 when the email already exists', (done) => {
    chai.request(app).post('/api/v1/auth/signup')
      .send(user)
      .end((req, res) => {
        res.status.should.eql(409);
        res.body.should.be.a('object');
        res.body.should.have.property('status').eql('fail');
        res.body.errors.should.be.a('object');
        res.body.errors.should.have.property('email').include(`User with email: ${user.email} already exists.`);
        done();
      });
  });

  it('should return 409 when the username already exists', (done) => {
    chai.request(app).post('/api/v1/auth/signup')
      .send(Object.assign({}, user, { email: 'user12@yahoo.com' }))
      .end((req, res) => {
        res.status.should.eql(409);
        res.body.should.be.a('object');
        res.body.should.have.property('status').eql('fail');
        res.body.errors.should.be.a('object');
        res.body.errors.should.have.property('username').include(`User with username: ${user.username} already exists.`);
        done();
      });
  });

  it('should return 409 when the username and email already exists', (done) => {
    chai.request(app).post('/api/v1/auth/signup')
      .send(user)
      .end((req, res) => {
        res.status.should.eql(409);
        res.body.should.be.a('object');
        res.body.should.have.property('status').eql('fail');
        res.body.errors.should.be.a('object');
        res.body.errors.should.have.property('email').include(`User with email: ${user.email} already exists.`);
        res.body.errors.should.have.property('username').include(`User with username: ${user.username} already exists.`);
        done();
      });
  });
});
