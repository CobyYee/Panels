import SortBar from './SortBar';
import GenreBar from './GenreBar';
import SearchList from './SearchList';

function HomeWrapper() {
    const comics = [{
        filename: "beginningaftertheend.jpg",
        title: "The Beginning After The End",
        author: "TurtleMe",
        description: "good shit",
        genres: ["Action", "Fantasy", "Romance"]
    }];
    return (
        <div id='home-wrapper' class="home-wrapper">
            <SortBar></SortBar>
            <GenreBar state={[false, false, false]}></GenreBar>
            <SearchList comics={comics}/>
        </div>  
    )
}

export default HomeWrapper;