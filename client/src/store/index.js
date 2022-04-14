import { createContext, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthContext from '../auth'
import api from './store-request-api'

export const GlobalStoreContext = createContext({});

export const GlobalStoreActionType = {
    SWITCH_MODE: "SWITCH_MODE",
    LOAD_WORKS: "LOAD_WORKS",
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
        searchField: ""
    });

    const storeReducer = (action) => {
        const { type, payload } = action;  
        switch (type) {
            case GlobalStoreActionType.SWITCH_MODE: {
                return setStore({
                    mode: payload.mode,
                    works: payload.works,
                    work: null,
                    chapter: null,
                    searchField: ""
                })
            }
            case GlobalStoreActionType.LOAD_WORKS: {
                return setStore({
                    works: payload,
                    work: null,
                    chapter: null,
                    searchField: ""
                })
            }
            case GlobalStoreActionType.LOAD_WORK: {
                return setStore({
                    works: store.works,
                    work: payload,
                    chapter: null,
                    searchField: ""
                })
            }
            case GlobalStoreActionType.LOAD_CHAPTER: {
                return setStore({
                    works: store.works,
                    work: store.work,
                    chapter: payload,
                    searchField: ""
                })
            }
            case GlobalStoreActionType.SEARCH: {
                return setStore({
                    works: store.works,
                    work: store.work,
                    chapter: store.chapter,
                    searchField: payload
                })
            }
            default:
                return store;
        }
    }

    store.home = async function() {
        if (store.mode === "comic") {
           
        }
    }

    store.loadComic = async function(id) {
        const response = await api.getComicById(id);
        if (response.status === 200) {
            let currentComic = response.data.comic;
            storeReducer({
                type: GlobalStoreActionType.LOAD_WORK,
                payload: currentComic
            });
            navigate("/comic/" + currentComic._id)
        }
        else {
            console.log("Failed to load comic: " + id);
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