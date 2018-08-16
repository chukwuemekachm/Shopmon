import { } from 'dotenv/config';
import sendGrid from '@sendgrid/mail';

const { SENDGRID_API_KEY } = process.env;

class EmailSender {
  /**
   * @description Sends an email to a recipient
   *
   * @param {String} receiver The recipient of the email
   * @param {String} subject The subject of the email
   * @param {String} template The message template
   *
   * @returns {Boolean} Returns a boolean value
   */
  static async sendMail(receiver, subject, template) {
    const message = {
      to: receiver,
      from: 'no-reply@shopmon.com',
      subject,
      html: template,
    };

    sendGrid.setApiKey(SENDGRID_API_KEY);
    const result = await sendGrid.send(message).then(() => true);
    return result;
  }
}

export default EmailSender;
