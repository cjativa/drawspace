import React, { useState } from 'react';
import AuthenticationService, { AuthenticationResponse } from '../../services/authenticationService';


const Login = (props: any) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginResponse, setLoginResponse] = useState<AuthenticationResponse | null>(null);

    /** Manages updating the state variables for the form inputs */
    const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {

        const { name, value } = event.target;

        if (name === 'username') {
            setUsername(value);
        }

        else if (name === 'password') {
            setPassword(value);
        }
    };

    /** Handles the login click */
    const onLoginClick = async () => {

        // Login and store the response
        const authResponse = await AuthenticationService.performLogin(username, password);
        setLoginResponse(authResponse);

        // Pass up the login state to the auth component
        props.updateLoggedIn(authResponse.success);
    };

    return (
        <div className="login">
            <p className="subtitle">Log into your DrawSpace profile to get back to creating.</p>

            {/** Input for username */}
            <div className="form-field">
                <label>Username</label>
                <input name="username" value={username} onChange={onInputChange} type="text" />
            </div>

            {/** Input for password */}
            <div className="form-field">
                <label>Password</label>
                <input name="password" value={password} onChange={onInputChange} type="password" />
            </div>

            <div className="auth-btn">
                <button className="brand-btn" onClick={onLoginClick}>
                    Login
                </button>
            </div>

            { /** Display error content when the login response is available */
                (loginResponse && loginResponse.success === false) &&
                <div className="auth__error">
                    <p>There was an error logging you in — {loginResponse.message} </p>
                </div>
            }
        </div>
    )
};

export default Login;