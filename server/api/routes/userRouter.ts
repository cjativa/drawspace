import express from 'express';
import UserController from '../controllers/userController';

const UserRouter = express.Router();

UserRouter.get('/', UserController.getUserDetails);

export default UserRouter;