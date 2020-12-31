import express from 'express';
import UserController from '../controllers/userController';

const UserRouter = express.Router();

UserRouter.get('/', UserController.getUserDetails);
UserRouter.get('/draw/:id', UserController.getDrawing);
UserRouter.post('/draw', UserController.saveDrawing);
UserRouter.get('/drawings', UserController.getDrawings);
UserRouter.delete('/draw/:id', UserController.deleteDrawing);

export default UserRouter;