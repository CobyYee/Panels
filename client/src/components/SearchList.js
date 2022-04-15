import ListCard from "./ListCard";
import { useContext, useEffect } from 'react';
import GlobalStoreContext from '../store';

function SearchList() {
    const {store} = useContext(GlobalStoreContext)

    useEffect(() => {
        store.listScreen();
    }, [store.mode]);

    return ( 
       <ul id="comic_list">
            {store.works.map((work, index) => (
                <li key={ "result" + index } class="comic_item">
                    <ListCard work={ work }/>
                </li>
            ))}
       </ul>     
    )
}

export default SearchList;
