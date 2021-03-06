import bcryptjs from 'bcryptjs';
import models from '../models';
import JwtHelper from '../services/JwtHelper';
import EmailSender from '../services/EmailSender';
import mailTemplates from '../services/mailTemplates';

const { User } = models;
const error = { message: 'Request was not processed, please try again later.', code: 400 };

class AuthController {
  /**
   * @description Verifies the account of a user
   *
   * @param {*} req The HTTP request objectt
   * @param {*} res The HTTP response object
   * @param {*} next The next middleware on the route
   */
  static async verifyAccount(req, res, next) {
    const { email } = req.user;
    User.update(
      { verified: true },
      { returning: true, where: { email } },
    ).then(async ([, [user]]) => {
      const {
        username, role, businessSlug, position,
      } = user;
      const token = await JwtHelper.signToken({
        user: {
          email, username, role, position, businessSlug,
        },
      }, '120h');
      return res.status(200).json({
        status: 'success',
        message: 'Your account has been activated succssfully.',
        token,
      });
    }).catch(() => next(error));
  }

  /**
   * @description Resends the activation link to the user email
   *
   * @param {*} req The HTTP request objectt
   * @param {*} res The HTTP response object
   * @param {*} next The next middleware on the route
   */
  static async resendVerificationLink(req, res, next) {
    const { email } = req.body;
    User.findOne({ where: { email } })
      .then(async (user) => {
        if (user) {
          const token = await JwtHelper.signToken({ user: { email } }, '24h');
          const message = mailTemplates.accountVerification(
            user.username,
            `${req.protocol}://${req.headers.host}/api/v1/auth/verify?token=${token}`,
          );
          EmailSender.sendMail(email, 'Account Verification', message);
          return res.status(200).json({
            status: 'success',
            message: 'Verification link has been sent to your email address.',
          });
        }
        return res.status(404).json({
          status: 'fail',
          errors: { email: [`User with the email: ${email} does not exist.`] },
        });
      }).catch(() => next(error));
  }

  /**
   * @description Creates a new user on the platform
   *
   * @param {Object} req The HTTP request object
   * @param {Object} res The HTTP response object
   * @param {Object} next The errorhandler on index.js
   */
  static async signUpUser(req, res, next) {
    const { slug: businessSlug } = req.business;
    const { email, username, password } = req.body;
    const token = await JwtHelper.signToken({ user: { email } }, '24h');
    User.create({
      email, businessSlug, username, position: 'owner', password: bcryptjs.hashSync(password, 10),
    })
      .then((user) => {
        const message = mailTemplates.accountVerification(
          username,
          `${req.protocol}://${req.headers.host}/api/v1/auth/verify?token=${token}`,
        );
        EmailSender.sendMail(email, 'Account Verification', message);
        return res.status(201).json({
          status: 'success',
          business: AuthController.stripUser(user),
          message: 'Your account was created successfull and a Verification link has been sent to your email address.',
        });
      }).catch(() => next(error));
  }

  /**
   * @description Strpes of sensitive information  from a user object
   *
   * @param {Object} user The user object to be stripped
   *
   * @returns {Object} The new user object which contains no sensitive information about the user
   */
  static stripUser(user) {
    const {
      email, username, businessSlug, position, role, imageUrl,
    } = user;
    return {
      email, username, businessSlug, position, role, imageUrl,
    };
  }

  /**
   * @description Authenticates the credentials of a user
   *
   * @param {Object} req The HTTP request object
   * @param {Object} res The HTTP response object
   * @param {Object} next The errorhandler on index.js
   */
  static async loginUser(req, res, next) {
    const { email, username, password } = req.body;
    User.findOne({
      where: { $or: [{ email }, { username }] },
    }).then(async (user) => {
      if (!user) {
        return res.status(401).json({
          status: 'fail',
          errors: AuthController.userNotFound(username, email),
          message: 'Your login failed.',
        });
      }
      const hashValue = bcryptjs.compareSync(password, user.password);
      if (hashValue) {
        if (user.verified) {
          const { role, position, businessSlug } = user;
          return res.status(200).json({
            status: 'success',
            user: AuthController.stripUser(user),
            token: await JwtHelper.signToken({
              user: {
                email: user.email, username: user.username, role, position, businessSlug,
              },
            }, '120h'),
            message: 'Your login was successful.',
          });
        }
        return res.status(401).json({
          status: 'fail',
          errors: { email: ['You have to verify your email before you can login.'] },
          message: 'Your login failed.',
        });
      }
      return res.status(401).json({
        status: 'fail',
        errors: { password: ['The password is incorrect.'] },
        message: 'Your login failed.',
      });
    }).catch(() => next(error));
  }

  static userNotFound(username, email) {
    if (username) {
      return {
        username: [`No user with ${username} exists.`],
      };
    }
    return {
      email: [`No user with ${email} exists.`],
    };
  }
}

export default AuthController;
