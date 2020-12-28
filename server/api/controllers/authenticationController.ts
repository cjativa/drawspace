import express from 'express';
import jwt from 'jsonwebtoken';
import AuthenticationService from '../services/authenticationService';
import Config from '../../utils/config';

export default class AuthenticationController {

    /** Signs in the the session */
    public static async login(request: express.Request, response: express.Response) {

        // Get the username and password from the request to verify it
        const { username, password } = request.body;

        // Verify the credentials and locate the user
        const user = await AuthenticationService.verifySignInCredentials(username, password);

        // User was successfully found with these credentials, so let's authorize them
        if (user) {
            response
                .status(200)
                .json({ token: AuthenticationController.generateJwt(user.name, username) });
        }

        // User was not located with those credentials
        else {
            response
            .status(403)
            .json('Error: Invalid credentials for sign-in');
        }
    };

    /** Registers the user for an account */
    public static async signUp(request: express.Request, response: express.Response) {

        // Get the credentials to sign up with and check if username already exists
        const { name, username, password } = request.body;
        const userAlreadyExists = await AuthenticationService.checkUserExistence(username);

        // Respond with error if the username already exists
        if (userAlreadyExists) {
            response
                .status(400)
                .json('Error: That username is already in use');
        }

        // Otherwise, proceed with sign up
        else {
            const createdUser = await AuthenticationService.registerCredentials(name, username, password);
            response
                .status(200)
                .json('Success: User was created');
        }
    };

    /** Generates a JWT with the provided payload. Expires in 1hr from issuance */
    private static generateJwt(name: string, username: string): string {

        // Sign the jwt to expire in 1 day
        const signedJwt = jwt.sign({ username, name }, Config.jwtSecretKey, { expiresIn: '1h' });
        return signedJwt;
    }
};