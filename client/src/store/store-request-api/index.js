/*
    We will be used Axios for making HTTP requests to our back end.
*/
import axios from 'axios'
axios.defaults.withCredentials = true;
const api = axios.create({
    baseURL: 'http://localhost:4000/api'
})

export const getComicById = (id) => api.get(`/comic/${id}`)
export const createComic = (payload) => api.post(`/comic/`, payload)
export const updateComic = (id, payload) => api.put(`/comic/${id}`, payload)
export const deleteComic = (id) => api.delete(`/comic/${id}`)
export const getAllComics = () => api.get(`/comics/`);
export const getComicsByGenres = (payload) => api.get(`/comicsbygenres`, payload)
export const getComicsByName = (payload) => api.get(`/comicsbyname/`, payload)      // change backend, name parameter in body, not params
export const deleteComicChapter = (id) => api.delete(`/comicchapter/${id}`)
export const getComicChapterById = (id) => api.get(`/comicchapter/${id}`)
export const createComicChapter = (payload) => api.post(`/comicchapter/`, payload)

export const getImagesById = (payload) => api.post(`/images/`, payload)

export const getStoryById = (id) => api.get(`/story/${id}`)
export const createStory = (payload) => api.post(`/story/`, payload)
export const updateStory = (id, payload) => api.put(`/story/${id}`, payload)
export const deleteStory = (id) => api.delete(`/story/${id}`)
export const getAllStories = () => api.get(`/stories/`);
export const getStoriesByGenres = (payload) => api.get(`/storiesbygenres`, payload)
export const getStoriesByName = (payload) => api.get(`/storiesbyname/`, payload)      // change backend, name parameter in body, not params
export const getStoriesByCreator = (id) => api.get(`/stories/${id}`)
export const deleteStoryChapter = (id) => api.delete(`/storychapter/${id}`)
export const getStoryChapterById = (id) => api.get(`/storychapter/${id}`)
export const createStoryChapter = (payload) => api.post(`/storychapter/`, payload)

export const updateUser = (payload) => api.put(`/user/`, payload)
export const getUserById = (id) => api.get(`/user/${id}`)


const apis = {
    getComicById,
    createComic,
    updateComic,
    deleteComic,
    getAllComics,
    getComicsByGenres,
    getComicsByName,
    deleteComicChapter,
    getComicChapterById,
    createComicChapter,

    getImagesById,

    getStoryById,
    createStory,
    updateStory,
    deleteStory,
    getAllStories,
    getStoriesByGenres,
    getStoriesByName,
    getStoriesByCreator,
    deleteStoryChapter,
    getStoryChapterById,
    createStoryChapter,

    updateUser,
    getUserById,
}

export default apis;