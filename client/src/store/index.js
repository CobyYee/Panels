import { Global } from '@emotion/react';
import { createContext, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthContext from '../auth'
import api from './store-request-api'

export const GlobalStoreContext = createContext({});

export const GlobalStoreActionType = {
    SWITCH_MODE: "SWITCH_MODE",
    HOME: "HOME",
    LOAD_WORK: "LOAD_WORK",
    LOAD_CHAPTER: "LOAD_CHAPTER",
    SEARCH: "SEARCH"
}

function GlobalStoreContextProvider(props) {
    const navigate = useNavigate();
    const auth = useContext(AuthContext)

    const [store, setStore] = useState({
        mode: "comic",
        works: [],
        work: null,
        chapter: null,
        searchField: "",
    });

    const storeReducer = (action) => {
        const { type, payload } = action;  
        switch (type) {
            case GlobalStoreActionType.SWITCH_MODE: {
                return setStore({
                    mode: (store.mode === "comic") ? "story" : "comic",
                    works: payload.works,
                    work: null,
                    chapter: null,
                    searchField: "",
                })
            }
            case GlobalStoreActionType.HOME: {
                return setStore({
                    mode: store.mode,
                    works: payload,
                    work: null,
                    chapter: null,
                    searchField: "",
                })
            }
            case GlobalStoreActionType.LOAD_WORK: {
                return setStore({
                    mode: store.mode,
                    works: store.works,
                    work: payload,
                    chapter: null,
                    searchField: "",
                })
            }
            case GlobalStoreActionType.LOAD_CHAPTER: {
                return setStore({
                    mode: store.mode,
                    works: store.works,
                    work: store.work,
                    chapter: payload,
                    searchField: "",
                })
            }
            case GlobalStoreActionType.SEARCH: {
                return setStore({
                    mode: store.mode,
                    works: store.works,
                    work: store.work,
                    chapter: store.chapter,
                    searchField: payload,
                })
            }
            default:
                return store;
        }
    }

    store.mode = function() {
        storeReducer({
            type: GlobalStoreActionType.SWITCH_MODE,
            payload: null
        })
    }

    store.home = async function() {
        if (store.mode === "comic") {
           const res = await api.getAllComics();
           if (res.status === 200) {
               let comics = res.data.data;
               storeReducer({
                   type: GlobalStoreActionType.LOAD_WORKS,
                   payload: comics
               }, () => {
                   navigate("/")
               })
           }
        }
    }

    store.loadComic = async function(id) {
        const response = await api.getComicById(id);
        if (response.status === 200) {
            let currentComic = response.data.comic;
            storeReducer({
                type: GlobalStoreActionType.LOAD_WORK,
                payload: currentComic
            }, () => {
                navigate("/comic/" + currentComic._id)
            });
        }
        else {
            console.log("Failed to load comic: " + id);
        }
    }

    store.loadStory = async function(id) {
        const response = await api.getStoryById(id);
        if (response.status === 200) {
            let currentStory = response.data.story;
            storeReducer({
                type: GlobalStoreActionType.LOAD_WORK,
                payload: currentStory
            }, () => {
                navigate("/story/" + currentStory._id);
            })
        }
        else {
            console.log("Failed to load story: " + id);
        }
    }

    store.loadComicChapter = async function(id) {
        const response = await api.getComicChapterById(id);
        if (response.status === 200) {
            let chapter = response.data.data;
            storeReducer({
                type: GlobalStoreActionType.LOAD_CHAPTER,
                payload: chapter
            }, () => {
                navigate("/chapter/" + chapter._id);
                }  
            )
        }
    }

    store.loadStoryChapter = async function(id) {
        const response = await api.getStoryChapterById(id);
        if (response.status === 200) {
            let chapter = response.data.data;
            storeReducer({
                type: GlobalStoreActionType.LOAD_CHAPTER,
                payload: chapter
            }, () => {
                navigate("/chapter/" + chapter._id);
                }  
            )
        }
    }

    store.setSearch = function(field) {         // this function will update search field onchange
        storeReducer({
            type: GlobalStoreActionType.SEARCH,
            payload: field
        })
    }

    store.search = async function() {           // this function will get an updated copy of all works and redirect to listscreen
        let response;
        if (store.mode === 0) 
            response = await api.getAllComics();
        else 
            response = await api.getAllStories();
        
        if (response.status === 200) {
            storeReducer({
                type: GlobalStoreActionType.LOAD_WORKS,
                payload: response.data.data
            }, () => {
                navigate("/listscreen")
            })
        }
    }

    return (
        <GlobalStoreContext.Provider  value = {{store}}>
            {props.children}
        </GlobalStoreContext.Provider>
    );
}

export default GlobalStoreContext;
export { GlobalStoreContextProvider };