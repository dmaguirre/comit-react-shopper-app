import React, { createContext, useState } from 'react'
import axios from 'axios';

const loginUrl = 'http://localhost:4000/login';

export const AuthContext = createContext();

export default function AuthProvider(props) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [webToken, setWebToken] = useState(null);


    const authenticate = async (credentials) => {
        console.log('Attempting to login with credentials');
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
            { props.children }
        </AuthContext.Provider>
    )
}
