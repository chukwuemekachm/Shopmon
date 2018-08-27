import { Router } from 'express';
import JwtHelper from '../services/JwtHelper';
import AuthValidation from '../validators/AuthValidation';
import UserHelper from '../middlewares/UserHelper';
import UserController from '../controllers/UserController';

const businessRouter = Router();

businessRouter.post(
  '/:businessSlug/users',
  AuthValidation.validateEmail,
  JwtHelper.validateManagement,
  UserHelper.userExists,
  UserController.createUser,
);
businessRouter.put(
  '/:businessSlug/users/:username',
  JwtHelper.validateManagement,
  UserController.updateUserPosition,
);
businessRouter.delete(
  '/:businessSlug/users/:username',
  JwtHelper.validateManagement,
  UserController.deleteUser,
);

export default businessRouter;
