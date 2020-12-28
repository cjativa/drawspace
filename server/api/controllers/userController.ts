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
};