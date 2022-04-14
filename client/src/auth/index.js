import { Global } from '@emotion/react';
import { createContext, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../src/api'

export const AuthContext = createContext({});

function AuthContextProvider(props) {
    const [auth, setAuth] = useState({
        
    });

    return (
        <AuthContext.Provider  value = {{auth}}>
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthContext;
export { AuthContextProvider };