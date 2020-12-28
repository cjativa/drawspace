import express from 'express';
import AuthenticationController from '../controllers/authenticationController';
// import { isSessionAuthenticated } from '../middleware/authenticationMiddleware';

const AuthenticationRouter = express.Router();

AuthenticationRouter.post('/login', AuthenticationController.login);
AuthenticationRouter.post('/sign-up', AuthenticationController.signUp);
// AuthenticationRouter.post('/sign-out', isSessionAuthenticated, AuthenticationController.signOut);

export default AuthenticationRouter;