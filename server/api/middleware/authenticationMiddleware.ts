import express from 'express';
import jwt from 'jsonwebtoken';
import Config from '../../utils/config';

export const isSessionAuthenticated = async (request: express.Request, response: express.Response, next: express.NextFunction) => {

    // Check if there's a bearer token in header
    const token = getBearerToken(request.headers.authorization);

    // If there's no token on the request, reject immediately
    if (!token) {
        response
            .status(403)
            .json('Invalid or missing authorization token');
    }

    // Else, there's a token. Let's see if it's valid
    else {
        const userPayload = jwt.verify(token, Config.jwtSecretKey) as { userId: number, username: string };

        // If there token is invalid (i.e. no payload), clear it and let the client know
        if (!userPayload) {
            response.status(403).json('Invalid or missing authorization token');
        }

        // Else, token is valid so let's attach the user id to the request
        else { request.userId = userPayload.userId; }

        next();
    }
};

const getBearerToken = (authorizationText: string): string => {

    // If there was no value in the authorization header
    if (!authorizationText) {
        throw Error('Invalid or missing authorization token');
    }

    // Otherwise, try to pick out the token
    try {
        const token = authorizationText.substring(authorizationText.indexOf(' ') + 1);
        return token;
    }

    catch (error) {
        console.log('An error occurred extracting the bearer token', error);
        throw Error('Invalid or missing authorization token');
    }
};