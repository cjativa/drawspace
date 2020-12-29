import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import AuthenticationService from '../services/authenticationService';

export const ProtectedRoute = (props: any) => {

    const [shouldRedirect, setShouldRedirect] = useState<boolean | null>(null);

    /** Determines if the user has access to the route by way of being logged in */
    useEffect(() => {
        if (AuthenticationService.isLoggedIn() == false) {
            setShouldRedirect(true);
        }

        else {
            setShouldRedirect(false);
        }
    }, []);

    /** When we know we should redirect for sure, go back to root */
    if (shouldRedirect) {
        return (
            <Redirect to="/" />
        )
    }

    /** Otherwise, we're authenticated, so explicitly no redirect */
    else if (shouldRedirect == false) {
        return (
            <>
                {props.children}
            </>
        );
    }

    /** Should redirect is not yet known, show essentially nothing */
    else {
        return (
            <></>
        )
    }
};

export default ProtectedRoute;