/*
    We will be used Axios for making HTTP requests to our back end.
*/
import axios from 'axios'
axios.defaults.withCredentials = true;
const api = axios.create({
    baseURL: 'http://localhost:4000/api'
})

export const getSession = () => api.get(`/getSession/`);
export const registerUser = (payload) => api.post(`/register/`, payload)
export const loginUser = (payload) => api.post(`/login/`, payload)
export const logoutUser = () => api.get(`/logout/`)
export const passwordRecovery = (payload) => api.post(`/passwordRecovery/`, payload)
export const saveNewPassword = (payload) => api.post(`/saveNewPassword/`, payload)
export const ban = (payload) => api.post(`/ban/`, payload)
export const unban = (payload) => api.post(`/unban/`, payload)
export const getUserById = (id) => api.get(`/user/${id}`)
export const updateUser = (payload) => api.put(`/user/`, payload)

export const getImagesById = (payload) => api.post(`/images/`, payload)
export const changeProfileImage = (payload) => api.post(`/profileimage/`, payload)

const apis = {
    getSession,
    registerUser,
    loginUser,
    logoutUser,
    passwordRecovery,
    saveNewPassword,
    ban,
    unban,
    getUserById,
    updateUser,
    getImagesById,
    changeProfileImage
}

export default apis;