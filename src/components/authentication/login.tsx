import React, { useState } from 'react';

const Login = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

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
        </div>
    )
};

export default Login;