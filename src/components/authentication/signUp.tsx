import React, { useState } from 'react';

const SignUp = () => {

    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

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

        </div>
    )
};

export default SignUp;