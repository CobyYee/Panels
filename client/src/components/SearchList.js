import ListCard from "./ListCard";
import { useContext } from 'react';
import GlobalStoreContext from '../store';

function SearchList() {
    const {store} = useContext(GlobalStoreContext)

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
