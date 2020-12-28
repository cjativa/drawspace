import express from 'express';
import jwt from 'jsonwebtoken';
import Config from '../../utils/config';

export const isSessionAuthenticated = async (request: express.Request, response: express.Response, next: express.NextFunction) => {

    // Check if there's a bearer token in header
    const { authorization } = request.headers;

    // If there's no token on the request, reject immediately
    if (!authorization) {
        response
            .status(403)
            .json({ message: 'Invalid or missing authorization token' });
    }

    // Else, there's a token. Let's see if it's valid
    else {
        const userPayload = jwt.verify(authorization, Config.jwtSecretKey);

        // If there token is invalid (i.e. no payload), clear it and let the client know
        if (!userPayload) {
            response.status(403).json('Invalid or missing authorization token');
        }

        // Else, token is valid, allow continuation of the request
        next();
    }
};