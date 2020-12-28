import React, { useState } from 'react';
import { Switch, Route, useLocation, Link, Redirect } from "react-router-dom";
import SignUp from './signUp';
import Login from './login';
import AuthenticationService from '../../services/authenticationService';

const Authentication = () => {

    // Set our initial auth state
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(AuthenticationService.isLoggedIn());

    // Get the current path and use it to determine the link classes
    const { pathname } = useLocation();
    const loginClassName = (pathname.includes('login'))
        ? 'sel'
        : ''
        ;
    const signUpClassName = (pathname.includes('sign-up'))
        ? 'sel'
        : ''
        ;

    /** Updates the local storage authentication state */
    const updateLoggedIn = (loggedIn: boolean) => {

        // Update it in storage and this component
        AuthenticationService.persistLoginState(loggedIn);
        setIsLoggedIn(loggedIn);
    };

    // If we're logged in, let's go to the draw screen
    if (isLoggedIn) {
        return (
            <Redirect to="/draw" />
        )
    }

    return (
        <div className="auth">

            <div className="auth__container">

                {/** Heading with animation */}
                <div className="auth__header">
                    <h1>
                        <span className="brand-green">Draw</span>
                        <span className="brand-pink">Space.</span>
                    </h1>
                    <p className="subtitle">
                        <Link to="/login" className={loginClassName}>Login</Link>
                        <span> | </span>
                        <Link to="/sign-up" className={signUpClassName}>Sign Up</Link>
                    </p>
                </div>

                <div className="auth__body">
                    <Switch>
                        {/** Display login component */}
                        <Route path="/login">
                            <Login updateLoggedIn={updateLoggedIn} />
                        </Route>

                        {/** Display sign-up component */}
                        <Route path="/sign-up">
                            <SignUp updateLoggedIn={updateLoggedIn} />
                        </Route>
                    </Switch>
                </div>

            </div>
        </div>
    )
};

export default Authentication;