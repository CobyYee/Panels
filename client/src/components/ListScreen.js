import SortBar from './SortBar';
import GenreBar from './GenreBar';
import SearchList from './SearchList';

function ListScreen(props) {
    return (
        <div class="search_list">
            <SortBar></SortBar>
            <GenreBar state={[false, false, false]}></GenreBar>
            <SearchList/>
        </div>  
    )
}

export default ListScreen;