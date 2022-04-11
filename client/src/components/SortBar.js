import { useState } from 'react'
import { Typography, Button, Box } from '@mui/material';

function SortBar(props) {
    const [sortBy, setSortBy] = useState([true, false, false]);

    function handleClick(event) {
        event.stopPropagation();
        const newState = [false, false, false];
        newState[event.target.value] = true;
        setSortBy(newState);
    }

    return (    
        <Box id="sort_bar">
            <Typography class="sort_label">Sort By:</Typography>
            <Button disableRipple class={sortBy[0] ? "sort_button_clicked" : "sort_button"} onClick={handleClick} value={0}>Latest Updated</Button>
            <Button disableRipple class={sortBy[1] ? "sort_button_clicked" : "sort_button"} onClick={handleClick} value={1}>Popularity</Button>
            <Button disableRipple class={sortBy[2] ? "sort_button_clicked" : "sort_button"} onClick={handleClick} value={2}>Alphabetically</Button>
        </Box>
    )
}

export default SortBar;
