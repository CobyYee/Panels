import { Global } from '@emotion/react';
import { createContext, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthContext from '../auth'
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
}

function GlobalStoreContextProvider(props) {
    const navigate = useNavigate();
    const auth = useContext(AuthContext)

    const [store, setStore] = useState({
        mode: "comic",
        works: [],
        work: null,
        images: [],
        chapter: null,
        searchField: "",
    });

    const storeReducer = (action) => {
        const { type, payload } = action;  
        switch (type) {
            case GlobalStoreActionType.SWITCH_MODE: {
                return setStore({
                    mode: (store.mode === "comic") ? "story" : "comic",
                    works: null,
                    work: null,
                    images: null,
                    chapter: null,
                    searchField: "",
                })
            }
            case GlobalStoreActionType.LOAD_WORKS: {
                return setStore({
                    mode: store.mode,
                    works: payload,
                    work: store.work,
                    images: store.images,
                    chapter: null,
                    searchField: "",
                })
            }
            case GlobalStoreActionType.LOAD_WORK: {
                return setStore({
                    mode: store.mode,
                    works: store.works,
                    work: payload,
                    images: store.images,
                    chapter: null,
                    searchField: "",
                })
            }
            case GlobalStoreActionType.LOAD_CHAPTER: {
                return setStore({
                    mode: store.mode,
                    works: store.works,
                    work: store.work,
                    images: store.images,
                    chapter: payload.chapter,
                    searchField: "",
                })
            }
            case GlobalStoreActionType.LOAD_IMAGES: {
                return setStore({
                    mode: store.mode,
                    works: store.works,
                    work: store.work,
                    images: payload,
                    chapter: store.chapter,
                    searchField: store.searchField,
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
    }

    store.home = async function() {
        try {
            if (store.mode === "comic") {
                let res = await api.getAllComics();
                if (res.status === 200) {
                    let comics = res.data.data;
                    storeReducer({
                        type: GlobalStoreActionType.LOAD_WORKS,
                        payload: comics
                    }, () => {
                    })
                    let works = comics.slice();
                    let featuredWorks = works.sort((a, b) => { return b.views - a.views}).slice(0, 8);
                    let imageIds = [];
                    for (let i = 0; i < featuredWorks.length && i < 8; i++) {
                        imageIds.push(featuredWorks[i].cover);
                    }
                     this.getImagesById(imageIds);
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
        let response;
        if (store.mode === 0) 
            response = await api.getComicsByName(parameter)
        else 
            response = await api.getStoriesByName(parameter);
        
        if (response.status === 200) {
            storeReducer({
                type: GlobalStoreActionType.HOME,
                payload: response.data.data
            }, () => {
                navigate("/listscreen")
            })
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