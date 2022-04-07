import { Global } from '@emotion/react';
import { createContext, useContext, useState } from 'react'

export const GlobalStoreContext = createContext({});

function GlobalStoreContextProvider(props) {
    const [store, setStore] = useState({
        
    });

    return (
        <GlobalStoreContext.Provider  value = {{store}}>
            {props.children}
        </GlobalStoreContext.Provider>
    );
}

export default GlobalStoreContext;
export { GlobalStoreContextProvider };