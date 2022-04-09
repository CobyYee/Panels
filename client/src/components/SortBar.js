import { useState } from 'react'
import { Typography, Button, Box } from '@mui/material';

function SortBar() {
    const [sortBy, setSortBy] = useState([false, false, false]);

    function handleClick(event) {
        event.stopPropagation();
        const newState = sortBy.slice();
        newState[event.target.value] = !sortBy[event.target.value];
        setSortBy(newState);
    }

    return (    
        <Box id="sort_bar">
            <Typography class="sort_label">Sort By:</Typography>
            <Button class={sortBy[0] ? "sort_button_clicked" : "sort_button"} onClick={handleClick} value={0}>Latest Updated</Button>
            <Button class={sortBy[1] ? "sort_button_clicked" : "sort_button"} onClick={handleClick} value={1}>Popularity</Button>
            <Button class={sortBy[2] ? "sort_button_clicked" : "sort_button"} onClick={handleClick} value={2}>Alphabetically</Button>
        </Box>
    )
}

export default SortBar;
