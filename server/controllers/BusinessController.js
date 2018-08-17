import models from '../models';
import createSlug from '../services/slug';

const error = { message: 'Request was not processed, please try again later.', code: 400 };
const { Business } = models;

class BusinessController {
  /**
   * @description Creates a new business
   *
   * @param {*} req The HTTP request objectt
   * @param {*} res The HTTP response object
   * @param {*} next The next middleware on the route
   */
  static async createBusiness(req, res, next) {
    const { businessName: name, businessAddress: address } = req.body;
    const slug = await createSlug(name);
    Business.create({ slug, name, address })
      .then((business) => {
        req.business = business;
        next();
      }).catch(() => next(error));
  }
}

export default BusinessController;
