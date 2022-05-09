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
    LOAD_FILTERED_WORKS: "LOAD_FILTERED_WORKS",
    LOAD_BOOKMARKS: "LOAD_BOOKMARKS",
    LOAD_WORK: "LOAD_WORK",
    LOAD_WORK_AND_CHAPTER: "LOAD_WORK_AND_CHAPTER",
    LOAD_PROFILE_WORKS: "LOAD_PROFILE_WORKS",
    LOAD_COMIC_CHAPTER: "LOAD_COMIC_CHAPTER",
    LOAD_STORY_CHAPTER: "LOAD_STORY_CHAPTER",
    UPDATE_COMIC_CHAPTER: "UPDATE_COMIC_CHAPTER",
    UPDATE_STORY_CHAPTER: "UPDATE_STORY_CHAPTER",
    SEARCH: "SEARCH",
    LOAD_IMAGES: "LOAD_IMAGES",
    LOAD_HOME: "LOAD_HOME"
}


function GlobalStoreContextProvider(props) {
    const navigate = useNavigate();
    const {auth} = useContext(AuthContext)
    const genres = ["Action", "Fantasy", "Romance", "Reincarnation", "Martial Arts", "Slice of Life", "Sports"];  

    const [store, setStore] = useState({
        mode: "comic",
        works: [],
        work: null,
        filteredWorks: [],
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
                    filteredWorks: [],
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
                    filteredWorks: payload.works,
                    work: null,
                    images: payload.images,
                    image: null,
                    chapter: null,
                    chapter_images: null
                })
            }
            case GlobalStoreActionType.LOAD_FILTERED_WORKS: {
                return setStore({
                    mode: store.mode,
                    works: payload.works ? payload.works : store.works,
                    filteredWorks: payload.filtered,
                    work: null,
                    images: payload.images,
                    image: null,
                    chapter: null,
                    chapter_images: null
                })
            }
            case GlobalStoreActionType.LOAD_BOOKMARKS: {
                return setStore({
                    mode: store.mode,
                    works: payload,
                    filteredWorks: store.filteredWorks,
                    work: null,
                    images: store.images,
                    image: null,
                    chapter: null,
                    chapter_images: null
                })
            }
            case GlobalStoreActionType.LOAD_PROFILE_WORKS: {
                return setStore({
                    mode: store.mode,
                    works: payload,
                    filteredWorks: store.filteredWorks,
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
                    filteredWorks: store.filteredWorks,
                    work: payload.work,
                    images: store.images,
                    image: payload.image,
                    chapter: null,
                    chapter_images: null
                })
            }
            case GlobalStoreActionType.LOAD_WORK_AND_CHAPTER: {
                return setStore({
                    mode: store.mode,
                    works: store.works,
                    filteredWorks: store.filteredWorks,
                    work: payload.work,
                    images: store.images,
                    image: payload.cover_image,
                    chapter: payload.chapter,
                    chapter_images: payload.chapter_images
                })
            }
            case GlobalStoreActionType.LOAD_COMIC_CHAPTER: {
                return setStore({
                    mode: store.mode,
                    works: store.works,
                    filteredWorks: store.filteredWorks,
                    work: store.work,
                    images: store.images,
                    image: store.image,
                    chapter: payload.chapter,
                    chapter_images: payload.images
                })
            }
            case GlobalStoreActionType.LOAD_STORY_CHAPTER: {
                return setStore({
                    mode: store.mode,
                    works: store.works,
                    filteredWorks: store.filteredWorks,
                    work: store.work,
                    images: store.images,
                    image: store.image,
                    chapter: payload,
                    chapter_images: null
                })
            }
            case GlobalStoreActionType.UPDATE_COMIC_CHAPTER: {
                return setStore({
                    mode: store.mode,
                    works: store.works,
                    filteredWorks: store.filteredWorks,
                    work: store.work,
                    images: store.images,
                    image: store.image,
                    chapter: payload.chapter,
                    chapter_images: payload.images
                })
            }
            case GlobalStoreActionType.UPDATE_STORY_CHAPTER: {
                return setStore({
                    mode: store.mode,
                    works: store.works,
                    filteredWorks: store.filteredWorks,
                    work: store.work,
                    images: store.images,
                    image: store.image,
                    chapter: payload,
                    chapter_images: null
                })
            }
            case GlobalStoreActionType.LOAD_IMAGES: {
                return setStore({
                    mode: store.mode,
                    works: store.works,
                    filteredWorks: store.filteredWorks,
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
                    filteredWorks: payload.works,
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
            console.log("konva created: " + response.data.data)
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

    store.home = async function() {
        try {
            let response = null;
            if (store.mode === "comic") {
                response = await api.getAllComics();
            }
            else {
                response = await api.getAllStories();
            }
            if (response.status === 200) {
                let data = response.data.data;
                let works = data.filter(work => work.published !== null).slice(0, 8);
                let featuredWorks = works.sort((a, b) => { return b.views - a.views});
                let imageIds = featuredWorks.map(work => work.cover);
                response = await api.getImagesById(imageIds);
                if (response.status === 200) {
                    let images = response.data.data;
                    storeReducer({
                        type: GlobalStoreActionType.LOAD_HOME,
                        payload: {
                            works: featuredWorks,
                            images: images
                        }
                    })
                }
            }
        }
        catch (err) {
            console.error("Store.home failed: " + err)
        }
    }

    store.sortWorks = async function(value) {
        let sorted = store.filteredWorks.slice();
        let sortedAll = store.works.slice();
        if (value == 0) {
            sorted = sorted.sort((a, b) => { return (b.published > a.published) - (b.published < a.published) });
            sortedAll = sorted.sort((a, b) => { return (b.published > a.published) - (b.published < a.published) });
        }
        else if (value == 1) {
            sorted = sorted.sort((a, b) => { return b.views-a.views });
            sortedAll = sorted.sort((a, b) => { return b.views-a.views });
            
        }
        else if (value == 2) {
            sorted = sorted.sort((a, b) => {
                let ratingA = 0;
                let ratingB = 0;
                if (a.ratings.length > 0) {
                    ratingA = a.ratings.reduce((i, j) => i + j, 0)/a.ratings.length;
                }
                if (b.ratings.length > 0) {
                    ratingB = b.ratings.reduce((i, j) => i + j, 0)/b.ratings.length;
                }
                return ratingB - ratingA;
            })

            sortedAll = sortedAll.sort((a, b) => {
                let ratingA = 0;
                let ratingB = 0;
                if (a.ratings.length > 0) {
                    ratingA = a.ratings.reduce((i, j) => i + j, 0)/a.ratings.length;
                }
                if (b.ratings.length > 0) {
                    ratingB = b.ratings.reduce((i, j) => i + j, 0)/b.ratings.length;
                }
                return ratingB - ratingA;
            })
        }
        else if (value == 3) {
            sorted = sorted.sort((a, b) => { return a.title.localeCompare(b.title) });
            sortedAll = sortedAll.sort((a, b) => { return a.title.localeCompare(b.title) });
        }
        let imageIds = sorted.map(work => work.cover);
        let response = await api.getImagesById(imageIds);
        if (response.status === 200) {
            let images = response.data.data;
            storeReducer({
                type: GlobalStoreActionType.LOAD_FILTERED_WORKS,
                payload: {
                    works: sortedAll,
                    filtered: sorted,
                    images: images
                }
            })
        }
    }

    store.filterWorks = async function(state) {
        let arr = [];
        let filtered = [];
        for (let i = 0; i < state.length; i++) {
            if (state[i]) {
                arr.push(i);
            }
        }
        console.log(store.works)
        let works_arr = store.works.slice();
        for (let i = 0; i < works_arr.length; i++) {
            let good = true;
            for (let j = 0; j < arr.length; j++) {
                if (!works_arr[i].genres.includes(genres[arr[j]])) {
                    good = false;
                    break;
                }
            }
            if (good)
                filtered.push(works_arr[i]);
        }
        let imageIds = filtered.map(work => work.cover);
        let response = await api.getImagesById(imageIds);
        if (response.status === 200) {
            let images = response.data.data;
            storeReducer({
                type: GlobalStoreActionType.LOAD_FILTERED_WORKS,
                payload: {
                    works: null,
                    filtered: filtered,
                    images: images
                }
            })
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
            let works = response.data.data.filter(work => work.published !== null);
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

    /* Work Functions */

    store.createWork = async function(title, file, description, tags) {
        const work = {
            title: title,
            creatorId: auth.session._id,
            creatorName: auth.session.username,
            genres: tags,
            description: description,
            cover_data: file
        }
        let response = null;
        if (store.mode === "comic") {
            response = await api.createComic(work);
        }
        else {
            response = await api.createStory(work);
        }        
        if (response.status === 200) {  
            let newWork = null;
            if (store.mode === "comic") {
                newWork = response.data.comic;
            }
            else {
                newWork = response.data.story;
            }
            storeReducer({
                type: GlobalStoreActionType.LOAD_WORK,
                payload: {
                    work: newWork,
                    image: file
                }
            })
            store.loadProfileWorks(auth.user._id);
            navigate(`/profile/${auth.session._id}`)
        }
        else {
            console.log("Failed to create new comic" + response);
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

    store.loadWorkAndChapter = async function(workId, chapterId) {
        let response = null;
        if (store.mode === "comic") {
            response = await api.getComicById(workId);
        }
        else {
            response = await api.getStoryById(workId);
        }
        if (response.status === 200) {
            let currentWork = null;
            if (store.mode === "comic") {
                currentWork = response.data.comic;
            }
            else {
                currentWork = response.data.story;
            }
            response = await api.getImagesById([currentWork.cover]);
            if (response.status === 200) {
                let cover_image = response.data.data;
                if (store.mode === "comic") {
                    response = await api.getComicChapterById(chapterId);
                }
                else {
                    response = await api.getStoryChapterById(chapterId);
                }
                if (response.status === 200) {
                    let chapter = response.data.data;
                    let chapter_images = chapter.images;
                    response = await api.getImagesById(chapter_images);
                    if (response.status === 200) {
                        let images = response.data.data;
                        storeReducer({
                            type: GlobalStoreActionType.LOAD_WORK_AND_CHAPTER,
                            payload: {
                                work: currentWork,
                                cover_image: cover_image,
                                chapter: chapter,
                                chapter_images: images
                            }
                        })
                    }
                }
            }
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
            //      response = await api.deleteComicChapter(chapter)
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

    /* Comic Functions */

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
            let newComic = response.data.comic;
            storeReducer({
                type: GlobalStoreActionType.LOAD_WORK,
                payload: {
                    work: newComic,
                    image: file
                }
            })
            store.loadProfileComics(auth.user._id);
            navigate(`/profile/${auth.session._id}`)
        }
        else {
            console.log("Failed to create new comic" + response);
        }
    }

    store.updateWork = async function(newTitle, newFile, newDescription, newTags) {
        let currentDraft = store.work;
        currentDraft.title = newTitle;
        currentDraft.cover = newFile;
        currentDraft.description = newDescription;
        currentDraft.genres = newTags;
        let response = null;
        if (store.mode === "comic") {
            response = await api.updateComic(currentDraft);
        }
        else {
            response = await api.updateStory(currentDraft);
        }
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

    //No longer used. Refer to loadWork
    /*
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
    */

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
                        type: GlobalStoreActionType.LOAD_COMIC_CHAPTER,
                        payload: {
                            chapter: newChapter,
                            chapter_images: images
                        }
                    })
                    console.log("comic updated")
                }
            }
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
                    type: GlobalStoreActionType.UPDATE_COMIC_CHAPTER,
                    payload: {
                        chapter: updated,
                        chapter_images: newImages
                    }
                })
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
                    type: GlobalStoreActionType.LOAD_COMIC_CHAPTER,
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

    store.publishComic = async function(id) {
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

    /* Story Functions */

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

    // No longer used. Refer to loadWork
    /*
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
    */

    store.createStoryChapter = async function(storyId, chapterName, chapter) {
        const storyChapter = {
            name: chapterName,
            chapter: chapter
        }
        let response = await api.createStoryChapter(storyChapter);
        if (response.status === 200) {
            let newChapter = response.data.data;
            response = await api.getStoryById(storyId);
            if (response.status === 200) {
                let story = response.data.story;
                story.chapters.push(JSON.stringify({
                    id: newChapter._id,
                    name: newChapter.name,
                    uploaded: newChapter.uploaded
                }));
                response = await api.updateStory(story);
                if (response.status === 200) {
                    storeReducer({
                        type: GlobalStoreActionType.LOAD_STORY_CHAPTER,
                        payload: newChapter
                    })
                    console.log("story updated")
                }
                else {
                    console.log(response);
                }
            }
        }
    }

    store.updateStoryChapter = async function(newName, newChapter) {
        let chapterDraft = store.chapter;
        chapterDraft.name = newName;
        chapterDraft.chapter = newChapter;
        let response = await api.updateStoryChapter(chapterDraft);
        if (response.status === 200) {
            let updated = response.data.data;
            storeReducer({
                type: GlobalStoreActionType.UPDATE_STORY_CHAPTER,
                payload: updated
            })
        }
    }

    store.loadStoryChapter = async function(id) {
        const response = await api.getStoryChapterById(id);
        if (response.status === 200) {
            let chapter = response.data.data;
            storeReducer({
                type: GlobalStoreActionType.LOAD_STORY_CHAPTER,
                payload: chapter
            })
        }
        else {
            console.log("No chapter found");
        }
    }

    store.publishStory = async function(id) {
        let response = await api.getStoryById(id);
        if (response.status === 200) {
            let story = response.data.story;
            story.published = new Date();
            response = await api.updateStory(story);
            if (response.status === 200) {
                storeReducer({
                    type: GlobalStoreActionType.LOAD_WORK,
                    payload: {
                        work: story,
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

    store.publish = async function (id) {
        if (store.mode === "comic") {
            store.publishComic(id);
        }
        else {
            store.publishStory(id);
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

    store.loadBookmarks = async function(ids) {
        let response = null;
        if (store.mode === "comic") {
            response = await api.getComicsById(ids);
        }
        else {
            response = await api.getStoriesById(ids);
        }
        if (response.status === 200) {
            let bookmarks = response.data.data;
            storeReducer({
                type: GlobalStoreActionType.LOAD_BOOKMARKS,
                payload: bookmarks
            })
        }
    }

    store.removeBookmark = async function(id) {
        let newWorks = store.works.slice().filter(work => work._id !== id);
        storeReducer({
            type: GlobalStoreActionType.LOAD_BOOKMARKS,
            payload: newWorks
        })
    }

    store.addRating = async function(id, rating) {
        let newWork = store.work;
        newWork.ratings.push(JSON.stringify({
            userId: id,
            rating: rating
        }));
        let response = null;
        if (store.mode === "comic") {
            response = await api.updateComic(newWork);
        }
        else {
            response = await api.updateStory(newWork);
        }
        if (response.status === 200) {
            storeReducer({
                type: GlobalStoreActionType.LOAD_WORK,
                payload: {
                    work: newWork,
                    image: store.image
                }
            })
            console.log("success");
        }
        else {
            console.log("failed");
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