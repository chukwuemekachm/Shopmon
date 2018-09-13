import { Router } from 'express';
import AuthController from '../controllers/AuthController';
import JwtHelper from '../services/JwtHelper';
import AuthValidation from '../validators/AuthValidation';
import UserHelper from '../middlewares/UserHelper';
import BusinessController from '../controllers/BusinessController';

const authRouter = Router();

authRouter.get('/verify', JwtHelper.decodeQueryToken, AuthController.verifyAccount);
authRouter.post('/verify', AuthValidation.validateEmail, AuthController.resendVerificationLink);
authRouter.post(
  '/signup',
  AuthValidation.validateSignup,
  UserHelper.userExists,
  BusinessController.createBusiness,
  AuthController.signUpUser,
);
authRouter.post('/login', AuthValidation.validateLogin, AuthController.loginUser);

export default authRouter;
