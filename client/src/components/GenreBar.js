import { useState, useContext } from 'react'
import { Typography, Button, Box } from '@mui/material';
import GlobalStoreContext from '../store'

function GenreBar(props) {
    const {store} = useContext(GlobalStoreContext);
    const [filterBy, setFilter] = useState(props.state);
    const genres = ["Action", "Fantasy", "Romance", "Reincarnation", "Martial Arts", "Slice of Life", "Sports"];                // perhaps put this into different file later so accessible by store

    function handleClick(event) {
        event.stopPropagation();
        const newState = filterBy.slice();
        newState[event.target.value] = !filterBy[event.target.value];
        setFilter(newState);
        store.filterWorks(newState);
    }

    return (    
        <Box id="genre_bar">
            <Typography class="filter_label">Genres:</Typography>
            {genres.map((genre, index) => (
                <Button key={ "genre-bar-" + index } disableRipple class={filterBy[index] ? "filter_button_clicked" : "filter_button"} onClick={handleClick} value={index}>{genre}</Button>
            ))}
        </Box>
    )
}

export default GenreBar;