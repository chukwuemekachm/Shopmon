import { } from 'dotenv/config';
import { describe, it } from 'mocha';
import chai from 'chai';
import EmailSender from '../services/EmailSender';

chai.should();

const template = `
<h4>Welcome to Shopmon</h4>
<br>
<p>Thank you for setting up this repository<p>
<br>
Thanks.
`;

describe('Email Sender', () => {
  it('should return a true when deployed to the server', async () => {
    const result = await EmailSender.sendMail('user@test.com', 'Testing', template);
    result.should.eql(true);
  });
});
