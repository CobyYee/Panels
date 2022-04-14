import { createContext, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthContext from '../auth'
import api from '../api'

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
        mode: 0,
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
                    works: payload,
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
        if (store.mode === 0) {
           const res = await api.getAllComics();
           if (res.status === 200) {
               let comics = res.data.data;
               let sorted = comics.sort((a, b) => {
                    return b.views - a.views;
               })
               let hotest = sorted.subString(0, 56);
           }
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