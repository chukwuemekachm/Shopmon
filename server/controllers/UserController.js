import bcryptjs from 'bcryptjs';
import models from '../models';
import { generateString } from '../services/slug';
import mailTemplates from '../services/mailTemplates';
import EmailSender from '../services/EmailSender';
import JwtHelper from '../services/JwtHelper';
import AuthController from './AuthController';

const { User } = models;

class UserController {
  /**
   * @description Creates and adds a new user to an organization
   *
   * @param {Object} req The request object
   * @param {Object} res The response object
   * @param {Object} next The next middleware
   */
  static async createUser(req, res, next) {
    const { email, position = 'employee' } = req.body;
    const password = generateString();
    const { businessSlug } = req.body.user;
    const token = await JwtHelper.signToken({ user: { email } }, '24h');
    User.create({
      email, username: email, businessSlug, password: bcryptjs.hashSync(password, 10), role: 'user', position,
    }).then((user) => {
      const message = mailTemplates.employeeAccountVerification(
        email,
        password,
        `${req.protocol}://${req.headers.host}/api/v1/auth/verify?token=${token}`,
      );
      EmailSender.sendMail(email, 'Account Verification', message);
      return res.status(201).json({
        status: 'success',
        employee: AuthController.stripUser(user),
        message: `You have successfully added ${email} to your organization, A verification mail has been sent to the email above.`,
      });
    }).catch(err => next(err));
  }

  /**
   * @description Verifies that a specified user exists and belongs to an organization
   *
   * @param {Object} res The HTTP response object
   * @param {String} username The username of the user to be verified
   * @param {String} businessSlug The businessSlug they should belong to
   * @param {Object} next The next middleware on the route
   *
   * @returns {Object} The verified user object
   */
  static async userBelongsToOrganization(res, username, businessSlug, next) {
    return new Promise((resolve, reject) => {
      User.findOne({ where: { username } }).then(async (user) => {
        if (!user) {
          return res.status(404).json({
            status: 'fail',
            errors: { username: [`There is no user with this username: ${username}.`] },
          });
        }
        if (user.businessSlug === businessSlug && user.position !== 'owner') {
          return resolve(user);
        }
        return res.status(403).json({
          status: 'fail',
          errors: { username: ['You either don\'t have the authorization to perform this operation OR This user don\'t belong to your organization.'] },
        });
      }).catch(() => next(reject));
    });
  }

  /**
   * @description Deletes an employee from an organization and platform
   *
   * @param {Object} req The request object
   * @param {Object} res The response object
   * @param {Object} next The next middleware
   */
  static async deleteUser(req, res, next) {
    const { username } = req.params;
    const { businessSlug } = req.body.user;
    const user = await UserController.userBelongsToOrganization(res, username, businessSlug, next);
    user.destroy();
    return res.status(200).json({
      status: 'success',
      message: 'You have successfully removed the user from your organization.',
    });
  }

  /**
   * @description Updates the position of an employee of an organization
   *
   * @param {Object} req The request object
   * @param {Object} res The response object
   * @param {Object} next The next middleware
   */
  static async updateUserPosition(req, res, next) {
    const { username } = req.params;
    let { position } = req.body;
    const { businessSlug } = req.body.user;
    const user = await UserController.userBelongsToOrganization(res, username, businessSlug, next);
    position = position || user.position;
    user.update({ position });
    return res.status(200).json({
      status: 'success',
      message: 'You have successfully updated the position of this user in your organization.',
    });
  }
}

export default UserController;
