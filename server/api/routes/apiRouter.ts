import express from 'express';
import AuthenticationRouter from './authenticationRouter';
import DrawingRouter from './drawingRouter';

const ApiRouter = express.Router();

ApiRouter.use('/auth', AuthenticationRouter);
ApiRouter.use('/draw', DrawingRouter);

export default ApiRouter;
