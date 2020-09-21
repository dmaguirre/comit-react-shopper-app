import React, { useState, useContext } from 'react'
import { AuthContext } from './AuthProvider';

export default function Login(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { authenticate } = useContext(AuthContext);
    
    const handleChangeUsername = (event) => {
        setUsername(event.target.value);
    }

    const handleChangePassword = (event) => {
        setPassword(event.target.value);
    }

    return (
        <div>
            <form onSubmit={(event) => event.preventDefault()}>
                <label>Username
                    <input value={username} onChange={handleChangeUsername} />
                </label>
                <label>Password
                    <input value={password} type="password" onChange={handleChangePassword} />
                </label>
                <button onClick={() => authenticate({ username, password })}>Submit</button>
            </form>
        </div>
    )
}
