import { createContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import api from './auth-request-api'

export const AuthContext = createContext();

// THESE ARE ALL THE TYPES OF UPDATES TO OUR AUTH STATE THAT CAN BE PROCESSED
export const AuthActionType = {
    GET_LOGGED_IN: "GET_LOGGED_IN",
    LOGIN_USER: "LOGIN_USER",
    LOGOUT_USER: "LOGOUT_USER",
    REGISTER_USER: "REGISTER_USER",
    ALERT_ERROR: "ALERT_ERROR",
    LOAD_PROFILE: "LOAD_PROFILE"
}

function AuthContextProvider(props) {
    const [auth, setAuth] = useState({
        session: null,
        user: null,
        error: null
    });
    const navigate = useNavigate();

    useEffect(() => {
        auth.getLoggedIn();
    }, []);

    const authReducer = (action) => {
        const {type, payload} = action
        switch(type) {
            case AuthActionType.GET_LOGGED_IN: {
                return setAuth({
                    session: payload,
                    user: auth.user,
                    error: null
                });
            }
            case "REGISTER_USER": {
                return setAuth({
                    session: null,
                    user: auth.user,
                    error: null
                })
            }
            case "LOGIN_USER": {
                return setAuth({
                    session: payload,
                    user: auth.user,
                    error: null
                })
            }
            case "LOGOUT_USER": {
                return setAuth({
                    session: null,
                    user: null,
                    error: null
                })
            }
            case "ALERT_ERROR": {
                return setAuth({
                    session: auth.session,
                    user: auth.user,
                    error: payload
                })
            }
            case "LOAD_PROFILE": {
                return setAuth({
                    session: auth.session,
                    user: payload,
                    error: null
                })
            }
            default:
                return auth;
        }
    }

    auth.getLoggedIn = async function () {
        console.log("getLoggedIn");
        try {
            const response = await api.getSession();
            if (response.status === 200) {
                console.log("seesion found")
                authReducer({
                    type: AuthActionType.GET_LOGGED_IN,
                    payload: response.data.user
                });
            }
            else {
                console.log(response.data.errorMessage)
            }
        } catch (err) {
            if (err.response) {
                console.log(err.response.data.errorMessage)
            }
        }
    }

    auth.loginUser = async function (userData) {
        console.log("loginUser")
        try {
            const response = await api.loginUser(userData);
            if(response.status === 200) {
                authReducer({
                    type: "LOGIN_USER",
                    payload: response.data.user 
                })
                navigate("/")
            }
        } catch (err) {
            console.log(err.response.data.errorMessage)
            authReducer({
                type: "ALERT_ERROR",
                payload: err.response.data.errorMessage
            })
        }
    }
    
    auth.registerUser = async function (userData) {
        console.log("registerUser")
        try {
            const response = await api.registerUser(userData);
            if(response.status === 200) {
                authReducer({
                    type: "REGISTER_USER",
                    payload: null
                })
                navigate("/login")
                return true;
            }
            else {
                return false;
            }
        }
        catch (err) {
            authReducer({
                type: "ALERT_ERROR",
                payload: err.response.data.errorMessage
            })
        }
    }

    auth.logoutUser = async function () {
        console.log("logoutUser");
        try {
            const response = await api.logoutUser();
            if (response.status === 200) {
                authReducer( {
                    type: AuthActionType.LOGOUT_USER,
                    payload: null
                })
                navigate("/");
            }
            else {
                console.log(response.data.errorMessage);
            }
        }
        catch (err) {
            if (err.response) {
                console.log(err.response.data.errorMessage);
            }
        }
    }

    auth.loadProfile = async function (id) {
        console.log("loadProfile: " + id);
        try {
            const response = await api.getUserById(id);
            if (response.status === 200) {
                let profile_user = response.data.user
                authReducer( {
                    type: AuthActionType.LOAD_PROFILE,
                    payload: profile_user
                })
                navigate("/profile/") 
            }
            else {
                console.log(response)
            }
        }
        catch (err) {
            console.log(err)
        }
    }

    auth.passwordReset = async function(email) {
        try {
            const response = await api.passwordRecovery(email);
            if (response.status === 200) {
                console.log("password reset email sent!")
                return true;
            }
            else {
                console.log("password reset 400");
                return false
            }
        }
        catch (e) {
            console.error("password reset failed")
            return false;
        }
    }

    auth.saveNewPassword = async function(password) {
        try {
            const response = await api.saveNewPassword(password);
            if (response.status === 200) {
                console.log("save new password success")
                return true;
            }
            else {
                console.log("save new password 400")
                return false;
            }
        }
        catch (e) {
            console.error("save new password failed")
            return false;
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