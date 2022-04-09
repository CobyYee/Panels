import { useState } from 'react'
import { Typography, Button, Box } from '@mui/material';

function GenreBar(props) {
    const [filterBy, setFilter] = useState(props.state);
    const genres = ["Action", "Fantasy", "Romance"];                // perhaps put this into different file later so accessible by store

    function handleClick(event) {
        event.stopPropagation();
        const newState = filterBy.slice();
        newState[event.target.value] = !filterBy[event.target.value];
        setFilter(newState);
    }

    return (    
        <Box id="genre_bar">
            <Typography class="filter_label">Genres:</Typography>
            {genres.map((genre, index) => (
                <Button disableRipple class={filterBy[index] ? "filter_button_clicked" : "filter_button"} onClick={handleClick} value={index}>{genre}</Button>
            ))}
        </Box>
    )
}

export default GenreBar;