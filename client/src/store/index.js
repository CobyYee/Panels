//import { Global } from '@emotion/react';
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
    LOAD_PROFILE_WORKS: "LOAD_PROFILE_WORKS",
    LOAD_CHAPTER: "LOAD_CHAPTER",
    SEARCH: "SEARCH",
    LOAD_IMAGES: "LOAD_IMAGES",
    LOAD_HOME: "LOAD_HOME"
}

function GlobalStoreContextProvider(props) {
    const navigate = useNavigate();
    const {auth} = useContext(AuthContext)

    const [store, setStore] = useState({
        mode: "comic",
        works: [],
        work: null,
        images: [],
        image: null,
        chapter: null,
        chapter_images: null
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
                    image: null,
                    chapter: null,
                    chapter_images: null
                })
            }
            case GlobalStoreActionType.LOAD_WORKS: {
                return setStore({
                    mode: store.mode,
                    works: payload.works,
                    work: null,
                    images: payload.images,
                    image: null,
                    chapter: null,
                    chapter_images: null
                })
            }
            case GlobalStoreActionType.LOAD_PROFILE_WORKS: {
                return setStore({
                    mode: store.mode,
                    works: payload,
                    work: null,
                    images: store.images,
                    image: null,
                    chapter: null,
                    chapter_images: null
                })
            }
            case GlobalStoreActionType.LOAD_WORK: {
                return setStore({
                    mode: store.mode,
                    works: store.works,
                    work: payload.work,
                    images: store.images,
                    image: payload.image,
                    chapter: null,
                    chapter_images: null
                })
            }
            case GlobalStoreActionType.LOAD_CHAPTER: {
                return setStore({
                    mode: store.mode,
                    works: store.works,
                    work: store.work,
                    images: store.images,
                    image: null,
                    chapter: payload.chapter,
                    chapter_images: payload.images
                })
            }
            case GlobalStoreActionType.LOAD_IMAGES: {
                return setStore({
                    mode: store.mode,
                    works: store.works,
                    work: store.work,
                    images: payload,
                    image: null,
                    chapter: null,
                    chapter_images: null
                })
            }
            case GlobalStoreActionType.LOAD_HOME: {
                return setStore({
                    mode: store.mode,
                    works: payload.works,
                    work: store.work,
                    images: payload.images,
                    image: null,
                    chapter: null,
                    chapter_images: null
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
            let imageIds = [];
            for (let i = 0; i < works.length; i++) {
                imageIds.push(works[i].cover);
            }
            response = await api.getImagesById(imageIds);
            if (response.status === 200) {
                let images = response.data.data;
                storeReducer({
                    type: GlobalStoreActionType.LOAD_WORKS,
                    payload: {
                        works: works,
                        images: images
                    }
                })
            }
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
                let works = response.data.data;
                let imageIds = [];
                for (let i = 0; i < works.length; i++) {
                    imageIds.push(works[i].cover);
                }
                response = await api.getImagesById(imageIds);
                if (response.status === 200) {
                    let images = response.data.data;
                    storeReducer({
                        type: GlobalStoreActionType.LOAD_WORKS,
                        payload: {
                            works: works,
                            images: images
                        }
                    })
                }
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
            })
        }
        else {
            console.log("Failed to load comic: " + id);
        }
    }

    store.publish = async function(id) {
        let response = await api.getComicById(id);
        if (response.status === 200) {
            let comic = response.data.comic;
            comic.published = new Date();
            response = await api.updateComic(comic);
            if (response.status === 200) {
                storeReducer({
                    type: GlobalStoreActionType.LOAD_WORK,
                    payload: {
                        work: comic,
                        image: store.image
                    }
                })
                if (store.mode === "comic") {
                    store.loadProfileComics(auth.user._id);
                }
                else {
                    store.loadProfileStories(auth.user._id);
                }
            }
            else {
                console.log(response);
            }
        }
        else {
            console.log("failed to find work");
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

    store.loadWork = async function(id) {
        let response = null;
        if (store.mode === "comic") {
            response = await api.getComicById(id);
        }
        else {
            response = await api.getStoryById(id);
        }
        if (response.status === 200) {
            let currentWork = null;
            if (store.mode === "comic") {
                currentWork = response.data.comic;
            }
            else {
                currentWork = response.data.story;
            }
            //console.log(currentWork);
            response = await api.getImagesById([currentWork.cover]);
            if (response.status === 200) {
                let cover_image = response.data.data;
                storeReducer({
                    type: GlobalStoreActionType.LOAD_WORK,
                    payload: {
                        work: currentWork,
                        image: cover_image
                    }
                })
            }
        }
        else {
            console.log("Failed to load " + store.mode + ": " + id);
        }
    }

    store.createComicChapter = async function(comicId, chapterName, images) {
        const comicChapter = {
            name: chapterName,
            images: images
        }
        let response = await api.createComicChapter(comicChapter);
        if (response.status === 200) {
            let newChapter = response.data.data;
            response = await api.getComicById(comicId);
            if (response.status === 200) {
                let comic = response.data.comic;
                comic.chapters.push(JSON.stringify({
                    id: newChapter._id,
                    name: newChapter.name,
                    uploaded: newChapter.uploaded
                }));
                response = await api.updateComic(comic);
                if (response.status === 200) {
                    storeReducer({
                        type: GlobalStoreActionType.LOAD_CHAPTER,
                        payload: newChapter
                    })
                    console.log("comic updated")
                }
            }
        }
    }

    store.loadComicChapter = async function(id) {
        let response = await api.getComicChapterById(id);
        if (response.status === 200) {
            let chapter = response.data.data;
            let chapter_images = chapter.images;
            response = await api.getImagesById(chapter_images);
            if (response.status === 200) {
                let images = response.data.data
                storeReducer({
                    type: GlobalStoreActionType.LOAD_CHAPTER,
                    payload: {
                        chapter: chapter,
                        images: images
                    }
                })
            }
            else {
                console.log("can't get images");
            }
        }
        else {
            console.log("No chapter found");
        }
    }

    store.loadStoryChapter = async function(id) {
        const response = await api.getStoryChapterById(id);
        if (response.status === 200) {
            let chapter = response.data.data;
            storeReducer({
                type: GlobalStoreActionType.LOAD_CHAPTER,
                payload: {
                    chapter: chapter,
                    images: null
                }
            })
        }
    }

    store.createComic = async function(title, file, description, tags) {
        //console.log(auth.session)
        const comic = {
            title: title,
            creatorId: auth.session._id,
            creatorName: auth.session.username,
            genres: tags,
            description: description,
            cover_data: file
        }
        const response = await api.createComic(comic);
        if (response.status === 200) {  
            let newComic = response.comic;
            storeReducer({
                type: GlobalStoreActionType.LOAD_WORK,
                payload: {
                    work: newComic,
                    image: file
                }
            })
            if (store.mode === "comic") {
                store.loadProfileComics(auth.user._id);
            }
            else {
                store.loadProfileStories(auth.user._id);
            }
            navigate(`/profile/${auth.session._id}`)
        }
        else {
            console.log("Failed to create new comic" + response);
        }
    }

    store.updateDraft = async function(newTitle, newFile, newDescription, newTags) {
        let currentDraft = store.work;
        currentDraft.title = newTitle;
        currentDraft.cover = newFile;
        currentDraft.description = newDescription;
        currentDraft.genres = newTags;
        const response = await api.updateComic(currentDraft);
        if (response.status === 200) {
            storeReducer({
                type: GlobalStoreActionType.LOAD_WORK,
                payload: {
                    work: currentDraft,
                    image: store.image
                }
            })
            console.log("comic updated")
        }
    }

    store.updateComicChapter = async function(newName, newImages) {
        let chapterDraft = store.chapter;
        chapterDraft.name = newName;
        chapterDraft.images = newImages;
        let response = await api.updateComicChapter(chapterDraft);
        if (response.status === 200) {
            let updated = response.data.data;
            response = await api.getImagesById(newImages);
            if (response.status === 200) {
                let newImages = response.data.data;
                storeReducer({
                    type: GlobalStoreActionType.LOAD_CHAPTER,
                    payload: {
                        chapter: updated,
                        chapter_images: newImages
                    }
                })
            }
        }
    }

    store.createStory = async function(storyData) {
        const response = api.createStory(storyData.title, auth.session._id, auth.session.userName, storyData.genres, storyData.description, storyData.cover);
        if (response.status === 200) {
            let newStory = response.story;
            storeReducer({
                type: GlobalStoreActionType.LOAD_WORK,
                payload: {
                    work: newStory,
                    image: storyData.cover
                }
            })
        }
        else {
            console.log("Failed to create new story" + response);
        }
    }

    store.deleteChapter = async function (id) {
        let response = null;
        if (store.mode === "comic") {
            response = await api.deleteComicChapter(id);
        }
        else {
            response = await api.deleteStoryChapter(id);
        }
        if (response.status === 200) {
            console.log("Chapter delete success");
        }
        else {
            console.log("Chapter delete failure" + response);
        }
    }

    store.deleteWork = async function (id) {
        let response = null;
        if (store.mode === "comic") {
            response = await api.deleteComic(id);
        }
        else {
            response = await api.deleteStory(id);
        }
        if (response.status === 200) {
            //get chapters from response.data and for each chapter, delete chapter
            //let chapters = response.data.chapters;
            //for (const chapter of chapters) {
            //      console.log(chapter)
            //      response = await api.deleteChapter(chapter)
            //      if (response.status !== 200) {
            //          continue;
            //      }
            //}
            if (store.mode === "comic") {
                store.loadProfileComics(auth.user._id);
            }
            else {
                store.loadProfileStories(auth.user._id);
            }
        }
    }

    store.loadProfileStories = async function(id) {
        const response = await api.getStoriesByCreator(id);
        if (response.status === 200) {
            let stories = response.data.stories;
            //console.log(stories);
            storeReducer({
                type: GlobalStoreActionType.LOAD_PROFILE_WORKS,
                payload: stories
            })
        }
        else {
            console.log("Failed to load stories by creator_id: " + id);
        }
    }

    //added the same for comics based on the above code
    store.loadProfileComics = async function(id) {
        const response = await api.getComicsByCreator(id);
        if (response.status === 200) {
            let comics = response.data.comics;
            //console.log(comics);
            storeReducer({
                type: GlobalStoreActionType.LOAD_PROFILE_WORKS,
                payload: comics
            })
        }
        else {
            console.log("Failed to load comics by creator_id: " + id);
        }
    }

    store.loadProfileWorks = async function(id) {
        let response = null;
        if (store.mode === "comic") {
            response = await api.getComicsByCreator(id);
        }
        else {
            response = await api.getStoriesByCreator(id);
        }
        if (response.status === 200) {
            let works = null;
            if (store.mode === "comic") {
                works = response.data.comics;
            }
            else {
                works = response.data.stories;
            }
            storeReducer({
                type: GlobalStoreActionType.LOAD_PROFILE_WORKS,
                payload: works
            })
        }
        else {
            console.log("Failed to load works by creator_id: " + id);
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
        else {
            console.log("failed to get images")
        }
    }


    store.createKonva = async function(data) {
        const response = await api.createKonva({
            data: data
        });
        if (response.status === 200) {
            storeReducer({
                type: GlobalStoreActionType.LOAD_PROFILE_WORKS,
                payload: store.works
            })
        }
        else {
            console.log("failed to create konva")
        }
    }

    store.getKonvasById = async function(ids) {
        const response = await api.getKonvasById(ids);
        if (response.status === 200) {
            console.log(response.data.data)
        }
        else {
            console.log("get konvas failed")
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