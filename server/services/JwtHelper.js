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
      return res.status(401).json({
        status: 'fail',
        errors: { email: ['The activation link has expired please provide your email.'] },
      });
    }
  }

  /**
   * @description Validates that the user has managerial roles
   *
   * @param {Object} req The HTTP request object
   * @param {Object} res The HTTP response object
   * @param {Object} next The next middleware on the route
   */
  static async validateManagement(req, res, next) {
    try {
      const token = req.headers['x-access-token'] || req.body.token || req.headers.authorization.split(' ')[1];
      const decoded = Jwt.verify(token, SECRET);
      if (decoded.user.position === 'manager' || decoded.user.position === 'owner') {
        req.body.user = decoded.user;
        return next();
      }
      return res.status(403).json({
        status: 'fail',
        errors: { user: ['You don\'t have the authorization to perform this operation.'] },
      });
    } catch (error) {
      return res.status(401).json({
        status: 'fail',
        errors: { user: ['You have to be authenticated to perform this operation.'] },
      });
    }
  }
}

export default JwtHelper;
