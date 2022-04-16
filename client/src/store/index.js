//import { Global } from '@emotion/react';
import { createContext, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
//import AuthContext from '../auth'
import api from './store-request-api'

export const GlobalStoreContext = createContext({});

export const GlobalStoreActionType = {
    SWITCH_MODE: "SWITCH_MODE",
    HOME: "HOME",
    LOAD_WORKS: "LOAD_WORKS",
    LOAD_WORK: "LOAD_WORK",
    LOAD_CHAPTER: "LOAD_CHAPTER",
    SEARCH: "SEARCH",
    LOAD_IMAGES: "LOAD_IMAGES",
    LOAD_HOME: "LOAD_HOME"
}

function GlobalStoreContextProvider(props) {
    const navigate = useNavigate();
    //const auth = useContext(AuthContext)

    const [store, setStore] = useState({
        mode: "comic",
        works: [],
        work: null,
        images: [],
        chapter: null
    });

    const storeReducer = (action) => {
        const { type, payload } = action;  
        switch (type) {
            case GlobalStoreActionType.SWITCH_MODE: {
                return setStore({
                    mode: (store.mode === "comic") ? "story" : "comic",
                    works: [],
                    work: null,
                    images: null,
                    chapter: null
                })
            }
            case GlobalStoreActionType.LOAD_WORKS: {
                return setStore({
                    mode: store.mode,
                    works: payload,
                    work: store.work,
                    images: store.images,
                    chapter: null
                })
            }
            case GlobalStoreActionType.LOAD_WORK: {
                return setStore({
                    mode: store.mode,
                    works: store.works,
                    work: payload,
                    images: store.images,
                    chapter: null
                })
            }
            case GlobalStoreActionType.LOAD_CHAPTER: {
                return setStore({
                    mode: store.mode,
                    works: store.works,
                    work: store.work,
                    images: store.images,
                    chapter: payload.chapter
                })
            }
            case GlobalStoreActionType.LOAD_IMAGES: {
                return setStore({
                    mode: store.mode,
                    works: store.works,
                    work: store.work,
                    images: payload,
                    chapter: store.chapter
                })
            }
            case GlobalStoreActionType.LOAD_HOME: {
                return setStore({
                    mode: store.mode,
                    works: payload.works,
                    work: store.work,
                    images: payload.images,
                    chapter: store.chapter
                })
            }
            default:
                return store;
        }
    }

    store.switchMode = function() {
        storeReducer({
            type: GlobalStoreActionType.SWITCH_MODE,
            payload: null
        })
        console.log("Switching modes to: " + ((store.mode === "comic") ? "story" : "comic"));
    }

    store.home = async function() {
        try {
            if (store.mode === "comic") {
                let res = await api.getAllComics();
                if (res.status === 200) {
                    let comics = res.data.data;
                    let works = comics.slice();
                    let featuredWorks = works.sort((a, b) => { return b.views - a.views}).slice(0, 8);
                    let imageIds = [];
                    for (let i = 0; i < featuredWorks.length && i < 8; i++) {
                        imageIds.push(featuredWorks[i].cover);
                    }
                    const response = await api.getImagesById(imageIds);
                    if (response.status === 200) {
                        let images = response.data.data;
                        storeReducer({
                            type: GlobalStoreActionType.LOAD_HOME,
                            payload: {
                                works: comics,
                                images: images
                            }
                        })
                    }
                    navigate("/")
                }
                else {
                }
            }
        }
        catch (err) {
            console.error("Store.home failed: " + err)
        }
    }

    store.listScreen = async function() {
        let response = null;
        if (store.mode === "comic") {
            response = await api.getAllComics();            
        }
        else {
            response = await api.getAllStories();
        }
        if (response.status === 200) {
            let works = response.data.data;
            storeReducer({
                type: GlobalStoreActionType.LOAD_WORKS,
                payload: works
            }, () => {
                navigate("/listscreen")
            })
        }
    }

    store.loadComic = async function(id) {
        const response = await api.getComicById(id);
        if (response.status === 200) {
            let currentComic = response.data.comic;
            storeReducer({
                type: GlobalStoreActionType.LOAD_WORK,
                payload: currentComic
            })
            //console.log(currentComic);
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

    //I don't think this works. May have to check later
    store.loadProfileStories = async function(id) {
        const response = await api.getStoriesByCreator(id);
        if (response.status === 200) {
            let stories = response.data.stories;
            console.log(stories);
            storeReducer({
                type: GlobalStoreActionType.LOAD_WORKS,
                payload: stories
            })
        }
        else {
            console.log("Failed to load stories by creator_id: " + id);
        }
    }

    store.search = async function(parameter) { 
        let response = null;
        if (parameter === "") {
            store.listScreen();
        }
        else {
            if (store.mode === "comic") {
                response = await api.getComicsByName(parameter)
            }
            else {
                response = await api.getStoriesByName(parameter);
            }        
            if (response.status === 200) {
                storeReducer({
                    type: GlobalStoreActionType.LOAD_WORKS,
                    payload: response.data.data
                })
            }
        }
    }

    store.getImagesById = async function(ids) {
        const response = await api.getImagesById(ids);
        if (response.status === 200) {
            storeReducer({
                type: GlobalStoreActionType.LOAD_IMAGES,
                payload: response.data.data
            }, () => {
                
            })
        }
    }

    return (
        <GlobalStoreContext.Provider  value={{store}}>
            {props.children}
        </GlobalStoreContext.Provider>
    );
}

export default GlobalStoreContext;
export { GlobalStoreContextProvider };