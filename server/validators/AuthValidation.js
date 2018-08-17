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

  /**
   * @description Validates the request payload to create a user
   *
   * @param {Object} req The request object
   * @param {Object} res The response object
   * @param {Object} next The next middleware
   *
   * @returns The next middleware to handle the user signup
   */
  static async validateSignup(req, res, next) {
    const userProperties = {
      username: 'required|alpha|min:2|max:100',
      email: 'required|email',
      businessName: 'required|string|min:5|max:100',
      businessAddress: 'required|min:10|max:200',
      password: 'required|alpha_num|min:8|max:20',
      confirmPassword: 'required|alpha_num|min:8|max:20|same:password',
    };

    const validator = new Validator(req.body, userProperties);
    validator.passes(() => {
      if (AuthValidation.passwordValidation(req.body.password)) return next();
      return res.status(400).json({
        status: 'error',
        errors: {
          password: ['Password must contain an Upper case letter, a lower case letter and a number.'],
        },
      });
    });
    validator.fails(() => {
      const errors = validator.errors.all();
      return res.status(400).json({
        status: 'error',
        errors,
      });
    });
  }

  /**
   * @description Validates that a password contains a number, an upper and lower case letter
   *
   * @param {String} password The password to be validated
   *
   * @returns The value of the evaluation
   */
  static passwordValidation(password) {
    if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(password)) {
      return true;
    }
    return false;
  }
}

export default AuthValidation;
