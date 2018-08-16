import { } from 'dotenv/config';
import { describe, it } from 'mocha';
import chai from 'chai';
import JwtHelper from '../services/JwtHelper';

chai.should();

const user = {
  email: 'user@test.com',
};

describe('Jwt Helper', () => {
  it('should sign a payload into a token', () => {
    const result = JwtHelper.signToken({ user }, '1h');
    result.should.not.eql(undefined);
  });
});
