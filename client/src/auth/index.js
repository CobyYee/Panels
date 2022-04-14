import { createContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from './auth-request-api'

export const AuthContext = createContext();

function AuthContextProvider(props) {
    const [auth, setAuth] = useState({
        user: null,
        error: null
    });
    const navigate = useNavigate();

    const authReducer = (action) => {
        const {type, payload} = action
        switch(type) {
            case "REGISTER_USER": {
                return setAuth({
                    user: null,
                    error: null
                })
            }
            case "LOGIN_USER": {
                return setAuth({
                    user: payload,
                    error: null
                })
            }
            case "LOGOUT_USER": {
                return setAuth({
                    user: null,
                    error: null
                })
            }
            case "ERROR": {
                return setAuth({
                    user: auth.user,
                    error: payload
                })
            }
        }
    }

    auth.isLoggedIn = async function () {
        if(auth.user !== null)
            return true
        return false
    }

    auth.loginUser = async function (userData) {
        try {
            const response = await api.loginUser(userData);
            if(response.status === 200) {
                authReducer({
                    type: "LOGIN",
                    payload: response.data.user 
                })
                navigate("/")
            }
        } catch (err) {
            authReducer({
                type: "ERROR",
                payload: err
            })
        }
    }
    
    auth.registerUser = async function (userData) {
        try {
            const response = await api.registerUser(userData);
            if(response.status === 200) {
                navigate("/")
            }
        }
        catch (err) {
            authReducer({
                type: "ERROR",
                payload: err
            })
        }
    }

    auth.logoutUser = async function () {
        try {
            const response = await api.logoutUser();
            if(response.status === 200) {
                navigate('/');
            }
        }
        catch (err) {
            authReducer({
                type: "LOGOUT",
                payload: null
            })
        }
    }

    return (
        <AuthContext.Provider  value = {{auth}}>
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthContext;
export { AuthContextProvider };