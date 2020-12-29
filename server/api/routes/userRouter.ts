import express from 'express';
import UserController from '../controllers/userController';

const UserRouter = express.Router();

UserRouter.get('/', UserController.getUserDetails);
UserRouter.post('/draw', UserController.saveDrawing);
UserRouter.get('/drawings', UserController.getDrawings);

export default UserRouter;