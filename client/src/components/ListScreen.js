import SortBar from './SortBar';
import GenreBar from './GenreBar';
import SearchList from './SearchList';

function ListScreen(props) {
    const comics = [{
        filename: "beginningaftertheend.jpg",
        title: "The Beginning After The End",
        author: "TurtleMe",
        description: "good shit",
        genres: ["Action", "Fantasy", "Romance"]
    }, 
    {
        filename: "beginningaftertheend.jpg",
        title: "The Beginning After The End",
        author: "TurtleMe",
        description: "good shit",
        genres: ["Action", "Fantasy", "Romance"]
    },
    {
        filename: "beginningaftertheend.jpg",
        title: "The Beginning After The End",
        author: "TurtleMe",
        description: "good shit",
        genres: ["Action", "Fantasy", "Romance"]
    }
    ];

    let sortState = [false, false, false,];
    if (props.topic === "popular")
        sortState[1] = true;
    else 
        sortState[1] = false;

    return (
        <div class="search_list">
            <SortBar state={sortState}></SortBar>
            <GenreBar state={[false, false, false]}></GenreBar>
            <SearchList comics={comics}/>
        </div>  
    )
}

export default ListScreen;