import React, { useState } from 'react'
import axios from 'axios';

import { AuthContext } from './AuthContext';


export default function AuthProvider() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [webToken, setWebToken] = useState(null);


    const authenticate = async (credentials) => {
        const response = await axios.post(loginUrl, credentials);
        if (response.data.success === true) {
            setIsAuthenticated(true);
            setWebToken(response.data.token);
            return true;
        }
        throw new Error("Invalid credentials");
    }
    
    const signout = () => {
        setIsAuthenticated(false);
        setWebToken(null);
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, webToken, authenticate, signout }}>
            
        </AuthContext.Provider>
    )
}
