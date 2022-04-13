import SortBar from './SortBar';
import GenreBar from './GenreBar';
import SearchList from './SearchList';

function ListScreen(props) {
    const comics = [{
        filename: "bate.jpg",
        title: "The Beginning After The End",
        author: "TurtleMe",
        description: "good shit",
        genres: ["Action", "Fantasy", "Romance"]
    }, 
    {
        filename: "bleach.jpg",
        title: "Bleach",
        author: "TurtleMe",
        description: "good shit",
        genres: ["Action", "Fantasy"]
    },
    {
        filename: "naruto.jpg",
        title: "Naruto",
        author: "TurtleMe",
        description: "good shit",
        genres: ["Action", "Fantasy"]
    }
    ];

    return (
        <div class="search_list">
            <SortBar></SortBar>
            <GenreBar state={[false, false, false]}></GenreBar>
            <SearchList comics={comics}/>
        </div>  
    )
}

export default ListScreen;