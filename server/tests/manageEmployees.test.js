import { } from 'dotenv/config';
import { describe, it, before } from 'mocha';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '..';
import JwtHelper from '../services/JwtHelper';

chai.should();
chai.use(chaiHttp);

const employee = {
  email: 'employee@test.com',
};
const user = {
  username: 'johnny',
  email: 'johnny@gmail.com',
  businessSlug: 'test-business-u9uue8u838',
  role: 'user',
  position: 'owner',
};
const user2 = {
  username: 'bobby',
  email: 'bobby@gmail.com',
  businessSlug: 'test-business-u9uue8u838',
  role: 'user',
  position: 'employee',
};
let token;
let token2;

describe('POST /api/v1/business/test-business-u9uue8u838/users Adds an employee to an organization', () => {
  before(async () => {
    token = await JwtHelper.signToken({ user }, '1hr');
    token2 = await JwtHelper.signToken({ user: user2 }, '1hr');
  });
  it('should return 201 when the employee was created and added to the business successfully', (done) => {
    chai.request(app).post('/api/v1/business/test-business-u9uue8u838/users')
      .set({ 'x-access-token': token })
      .send(employee)
      .end((req, res) => {
        res.status.should.eql(201);
        res.body.should.be.a('object');
        res.body.should.have.property('status').eql('success');
        res.body.should.have.property('employee');
        res.body.employee.should.be.a('object');
        res.body.employee.should.have.property('email');
        res.body.employee.should.have.property('username');
        res.body.employee.should.have.property('businessSlug');
        res.body.employee.should.have.property('position');
        res.body.employee.should.have.property('role');
        res.body.employee.should.have.property('imageUrl');
        res.body.should.have.property('message').eql(`You have successfully added ${employee.email} to your organization, A verification mail has been sent to the email above.`);
        done();
      });
  });

  it('should return 400 when the email is not valid', (done) => {
    chai.request(app).post('/api/v1/business/test-business-u9uue8u838/users')
      .set({ 'x-access-token': token })
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

  it('should return 401 when a token is not provided', (done) => {
    chai.request(app).post('/api/v1/business/test-business-u9uue8u838/users')
      .send({ email: 'usertest@mail.com' })
      .end((req, res) => {
        res.status.should.eql(401);
        res.body.should.be.a('object');
        res.body.should.have.property('errors');
        res.body.errors.should.be.a('object');
        res.body.errors.should.have.property('user').include('You have to be authenticated to perform this operation.');
        done();
      });
  });

  it('should return 409 when the email already exists', (done) => {
    chai.request(app).post('/api/v1/business/test-business-u9uue8u838/users')
      .set({ 'x-access-token': token })
      .send(employee)
      .end((req, res) => {
        res.status.should.eql(409);
        res.body.should.be.a('object');
        res.body.should.have.property('status').eql('fail');
        res.body.errors.should.be.a('object');
        res.body.errors.should.have.property('email').include(`User with email: ${employee.email} already exists.`);
        done();
      });
  });
});

describe('PUT /api/v1/business/test-business-u9uue8u838/users/:username Updates the position of an employee in an organization', () => {
  before(async () => {
    token = await JwtHelper.signToken({ user }, '1hr');
  });
  it('should return 200 when the employee\'s position was updated successfully', (done) => {
    chai.request(app).put(`/api/v1/business/test-business-u9uue8u838/users/${employee.email}`)
      .set({ 'x-access-token': token })
      .send({ position: 'manager' })
      .end((req, res) => {
        res.status.should.eql(200);
        res.body.should.be.a('object');
        res.body.should.have.property('status').eql('success');
        res.body.should.have.property('message').eql('You have successfully updated the position of this user in your organization.');
        done();
      });
  });

  it('should return 404 when the user does not exist', (done) => {
    chai.request(app).put('/api/v1/business/test-business-u9uue8u838/users/no-user')
      .set({ 'x-access-token': token })
      .send({ position: 'manager' })
      .end((req, res) => {
        res.status.should.eql(404);
        res.body.should.be.a('object');
        res.body.should.have.property('errors');
        res.body.errors.should.be.a('object');
        res.body.errors.should.have.property('username').include('There is no user with this username: no-user.');
        done();
      });
  });

  it('should return 401 when a token is not provided', (done) => {
    chai.request(app).put(`/api/v1/business/test-business-u9uue8u838/users/${employee.email}`)
      .send({ position: 'manager' })
      .end((req, res) => {
        res.status.should.eql(401);
        res.body.should.be.a('object');
        res.body.should.have.property('errors');
        res.body.errors.should.be.a('object');
        res.body.errors.should.have.property('user').include('You have to be authenticated to perform this operation.');
        done();
      });
  });

  it('should return 403 when the user does not belong to the organization or owns the business', (done) => {
    chai.request(app).put('/api/v1/business/test-business-u9uue8u838/users/drille')
      .set({ 'x-access-token': token })
      .send({ position: 'manager' })
      .end((req, res) => {
        res.status.should.eql(403);
        res.body.should.be.a('object');
        res.body.should.have.property('status').eql('fail');
        res.body.errors.should.be.a('object');
        res.body.errors.should.have.property('username').include('You either don\'t have the authorization to perform this operation OR This user don\'t belong to your organization.');
        done();
      });
  });
});

describe('DELETE /api/v1/business/test-business-u9uue8u838/users/:username Removes an employee from an organization', () => {
  before(async () => {
    token = await JwtHelper.signToken({ user }, '1hr');
  });
  it('should return 200 when the employee was removed from the business successfully', (done) => {
    chai.request(app).delete(`/api/v1/business/test-business-u9uue8u838/users/${employee.email}`)
      .set({ 'x-access-token': token })
      .send({ position: 'manager' })
      .end((req, res) => {
        res.status.should.eql(200);
        res.body.should.be.a('object');
        res.body.should.have.property('status').eql('success');
        res.body.should.have.property('message').eql('You have successfully removed the user from your organization.');
        done();
      });
  });

  it('should return 404 when the user does not exist', (done) => {
    chai.request(app).delete('/api/v1/business/test-business-u9uue8u838/users/no-user')
      .set({ 'x-access-token': token })
      .end((req, res) => {
        res.status.should.eql(404);
        res.body.should.be.a('object');
        res.body.should.have.property('errors');
        res.body.errors.should.be.a('object');
        res.body.errors.should.have.property('username').include('There is no user with this username: no-user.');
        done();
      });
  });

  it('should return 401 when a token is not provided', (done) => {
    chai.request(app).delete(`/api/v1/business/test-business-u9uue8u838/users/${employee.email}`)
      .end((req, res) => {
        res.status.should.eql(401);
        res.body.should.be.a('object');
        res.body.should.have.property('errors');
        res.body.errors.should.be.a('object');
        res.body.errors.should.have.property('user').include('You have to be authenticated to perform this operation.');
        done();
      });
  });

  it('should return 403 when the user is not authorized', (done) => {
    chai.request(app).delete(`/api/v1/business/test-business-u9uue8u838/users/${employee.email}`)
      .set({ 'x-access-token': token2 })
      .end((req, res) => {
        res.status.should.eql(403);
        res.body.should.be.a('object');
        res.body.should.have.property('errors');
        res.body.errors.should.be.a('object');
        res.body.errors.should.have.property('user').include('You don\'t have the authorization to perform this operation.');
        done();
      });
  });

  it('should return 403 when the user does not belong to the organization or owns the business', (done) => {
    chai.request(app).delete('/api/v1/business/test-business-u9uue8u838/users/drille')
      .set({ 'x-access-token': token })
      .end((req, res) => {
        res.status.should.eql(403);
        res.body.should.be.a('object');
        res.body.should.have.property('status').eql('fail');
        res.body.errors.should.be.a('object');
        res.body.errors.should.have.property('username').include('You either don\'t have the authorization to perform this operation OR This user don\'t belong to your organization.');
        done();
      });
  });
});
