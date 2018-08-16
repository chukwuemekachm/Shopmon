import { } from 'dotenv/config';
import Jwt from 'jsonwebtoken';

const { SECRET } = process.env;

class JwtHelper {
  /**
   * @description Signs an object into a jsonwebtoken
   *
   * @param {Object} payload The payload to be signed
   * @param {String} expiresIn The expiration time of the token
   *
   * @returns {String} The signed jsonwebtoken
   */
  static async signToken(payload, expiresIn) {
    return Jwt.sign(payload, SECRET, { expiresIn });
  }

  /**
   * @description Decodes a jsonwebtoken and returns the result
   *
   * @param {String} token The token to be decoded
   *
   * @returns {Object} Returns a verified token or a false
   */
  static async decodeQueryToken(req, res, next) {
    const { token } = req.query;
    try {
      const decoded = Jwt.verify(token, SECRET);
      req.user = decoded.user;
      return next();
    } catch (err) {
      console.log(err);
      return res.status(401).json({
        status: 'fail',
        errors: { email: ['The activation link has expired please provide your email.'] },
      });
    }
  }
}

export default JwtHelper;
