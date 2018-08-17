import models from '../models';

const { User } = models;
const error = { message: 'Request was not processed, please try again later.', code: 400 };

class UserHelper {
  /**
   * @description Verifies if the user exists or not
   *
   * @param {*} req The HTTP request objectt
   * @param {*} res The HTTP response object
   * @param {*} next The next middleware on the route
   */
  static userExists(req, res, next) {
    const { username, email } = req.body;
    User.findOne({
      where: { $or: [{ email }, { username }] },
    }).then((user) => {
      if (!user) return next();
      if (user.email === email && user.username === username) {
        return res.status(409).json({
          status: 'fail',
          errors: {
            email: [`User with email: ${email} already exists.`],
            username: [`User with username: ${username} already exists.`],
          },
        });
      }
      if (user.email === email) {
        return res.status(409).json({
          status: 'fail',
          errors: {
            email: [`User with email: ${email} already exists.`],
          },
        });
      }
      return res.status(409).json({
        status: 'fail',
        errors: {
          username: [`User with username: ${username} already exists.`],
        },
      });
    }).catch(() => next(error));
  }
}

export default UserHelper;
