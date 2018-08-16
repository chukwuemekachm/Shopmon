import Validator from 'validatorjs';

class AuthValidation {
  /**
   * @description Validates an email in the request body
   *
   * @param {Object} req The HTTP request object
   * @param {Object} res The HTTP response object
   * @param {Object} next The next middleware on the route
   */
  static async validateEmail(req, res, next) {
    const userProperties = {
      email: 'required|email',
    };
    const validator = new Validator(req.body, userProperties);
    validator.passes(() => next());
    validator.fails(() => {
      const errors = validator.errors.all();
      return res.status(400).json({
        status: 'error',
        errors,
      });
    });
  }
}

export default AuthValidation;
