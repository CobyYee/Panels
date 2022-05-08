import ListCard from "./ListCard";
import { useContext, useEffect, useRef } from 'react';
import GlobalStoreContext from '../store';

function SearchList() {
    const firstRender = useRef(false);
    const {store} = useContext(GlobalStoreContext)

    useEffect(() => {
        if (firstRender.current) {
            store.listScreen();
        }
        firstRender.current = true;
    }, [store.mode]);

    return ( 
       <ul id="comic_list">
            {store.works.filter(work => work.published !== null).map((work, index) => (
                <li key={ "result" + index } class="comic_item">
                    <ListCard work={work} cover={(store.images !== null) ? store.images[index] : null}/>
                </li>
            ))}
       </ul>     
    )
}

export default SearchList;
