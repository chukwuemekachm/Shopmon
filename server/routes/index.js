import { Router } from 'express';
import authRouter from './auth';
import businessRouter from './business';

const routes = Router();

routes.use('/auth', authRouter);
routes.use('/business', businessRouter);

export default routes;
