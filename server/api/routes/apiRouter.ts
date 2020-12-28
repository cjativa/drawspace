import { isSessionAuthenticated } from '../middleware/authenticationMiddleware';
import express from 'express';
import AuthenticationRouter from './authenticationRouter';
import UserRouter from './userRouter';

const ApiRouter = express.Router();

ApiRouter.use('/auth', AuthenticationRouter);
ApiRouter.use('/user', isSessionAuthenticated, UserRouter);

export default ApiRouter;
