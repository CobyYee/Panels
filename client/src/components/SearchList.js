import ListCard from "./ListCard";
import { useContext, useLayoutEffect, useRef } from 'react';
import GlobalStoreContext from '../store';

function SearchList() {
    const firstRender = useRef(false);
    const {store} = useContext(GlobalStoreContext)

    useLayoutEffect(() => {
        if (firstRender.current) {
            store.listScreen();
        }
        firstRender.current = true;
    }, [store.mode]);

    return ( 
       <ul id="comic_list">
            {store.filteredWorks.map((work, index) => (
                <li key={ "result" + index } class="comic_item">
                    <ListCard work={work} cover={(store.images !== null) ? store.images[index] : null}/>
                </li>
            ))}
       </ul>     
    )
}

export default SearchList;
