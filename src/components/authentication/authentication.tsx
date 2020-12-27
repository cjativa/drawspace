import React from 'react';
import { Switch, Route, useLocation, Link } from "react-router-dom";
import SignUp from './signUp';
import Login from './login';

const Authentication = () => {

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


    return (
        <div className="auth">

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
                        <Login />
                    </Route>

                    {/** Display sign-up component */}
                    <Route path="/sign-up">
                        <SignUp />
                    </Route>
                </Switch>
            </div>
        </div>
    )
};

export default Authentication;