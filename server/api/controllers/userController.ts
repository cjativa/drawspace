import express from 'express';
import UserService from '../services/userService';

export default class UserController {

    /** Retrieves user details and responds with them */
    public static async getUserDetails(request: express.Request, response: express.Response) {

        // Get the user id from the request and retrieve the details
        const { userId } = request;
        const userDetails = await UserService.getUserDetails(userId);

        response
            .status(200)
            .json(userDetails);
    };

    /** Saves a drawing for the user */
    public static async saveDrawing(request: express.Request, response: express.Response) {

        // Get the information needed for saving the drawing
        const { userId } = request;
        const { drawingData, timeElapsed, isPublic } = request.body;

        const savedDrawing = await UserService.saveDrawing(userId, drawingData, timeElapsed, isPublic);

        response
            .status(200)
            .json(savedDrawing);
    };

    /** Retrieves all the drawings for a user */
    public static async getDrawings(request: express.Request, response: express.Response) {

        // Get the user id and use it to retrieve the drawings
        const { userId } = request;
        const drawings = await UserService.getDrawings(userId);

        response
            .status(200)
            .json(drawings);
    };

    /** Deletes the requetsed drawing */
    public static async deleteDrawing(request: express.Request, response: express.Response) {

        // Get the user id to look up and delete the drawing
        const { userId } = request;
        const { id } = request.params;

        await UserService.deleteDrawing(userId, parseInt(id));

        response
            .status(200)
            .json('ok');
    };
};