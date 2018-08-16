import { Router } from 'express';
import AuthController from '../controllers/AuthController';
import JwtHelper from '../services/JwtHelper';
import AuthValidation from '../validators/AuthValidation';

const authRouter = Router();

authRouter.get('/verify', JwtHelper.decodeQueryToken, AuthController.verifyAccount);
authRouter.post('/verify', AuthValidation.validateEmail, AuthController.resendVerificationLink);

export default authRouter;
