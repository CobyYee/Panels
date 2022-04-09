import { Typography, Box } from '@mui/material';
import SortBar from './SortBar';
import GenreBar from './GenreBar';
import SearchList from './SearchList';



export default function ListScreen() {
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
    return (
        <div class="search_list">
            <SortBar></SortBar>
            <GenreBar state={[false, false, false]}></GenreBar>
            <SearchList comics={comics}/>
        </div>  
    )
}