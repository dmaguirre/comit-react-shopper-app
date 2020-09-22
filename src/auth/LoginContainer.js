import React, { useContext, useState } from 'react'
import { AuthContext } from './AuthProvider';

import Login from './Login';

export default function LoginContainer() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { authenticate } = useContext(AuthContext);
    
    const handleChangeUsername = (event) => {
        setUsername(event.target.value);
    }

    const handleChangePassword = (event) => {
        setPassword(event.target.value);
    }

    const handleAuthenticate = () => {
        authenticate({ username, password })
    }

    return (
        <Login 
            username={username} 
            password={password} 
            handleChangeUsername={handleChangeUsername}
            handleChangePassword={handleChangePassword}
            handleClick={handleAuthenticate}
        />
    )
}
