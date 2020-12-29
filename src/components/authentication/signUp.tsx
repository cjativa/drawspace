import React, { useState } from 'react';
import AuthenticationService, { AuthenticationResponse } from '../../services/authenticationService';

const SignUp = (props: any) => {

    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [signUpResponse, setSignUpResponse] = useState<AuthenticationResponse | null>(null);

    /** Manages updating the state variables for the form inputs */
    const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {

        const { name, value } = event.target;

        if (name === 'name') {
            setName(value);
        }

        else if (name === 'username') {
            setUsername(value);
        }

        else if (name === 'password') {
            setPassword(value);
        }
    };

    /** Handles the sign up click */
    const onSignUpClick = async () => {

        // Sign up and store the response
        const authResponse = await AuthenticationService.performSignUp(name, username, password);
        setSignUpResponse(authResponse);

        // Pass up the login state to the auth component
        props.updateLoggedIn(authResponse.success, authResponse.token);
    };

    return (
        <div className="sign-up">
            <p className="subtitle">Join DrawSpace and start designing things you'll love.</p>

            {/** Input for name */}
            <div className="form-field">
                <label>Name</label>
                <input name="name" value={name} onChange={onInputChange} type="text" />
            </div>

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
                <button onClick={onSignUpClick} className="auth__btn brand-btn">Sign Up</button>
            </div>

            { /** Display error content when the sign up response is available */
                (signUpResponse && signUpResponse.success === false) &&
                <div className="auth__error">
                    <p>There was an error logging you in — {signUpResponse.message} </p>
                </div>
            }
        </div>
    )
};

export default SignUp;