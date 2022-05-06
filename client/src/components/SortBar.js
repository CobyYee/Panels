import { useState } from 'react'
import { Button, Box } from '@mui/material';

function SortBar() {
    const [sortBy, setSortBy] = useState([true, false, false]);

    function handleClick(event) {
        event.stopPropagation();
        const newState = [false, false, false];
        newState[event.target.value] = true;
        setSortBy(newState);
    }

    return (    
        <Box id="sort_bar">
            <div className="sort_label">Sort By:</div>
            <Button disableRipple class={sortBy[0] ? "sort_button_clicked" : "sort_button"} onClick={handleClick} value={0}>Latest Updated</Button>
            <Button disableRipple class={sortBy[1] ? "sort_button_clicked" : "sort_button"} onClick={handleClick} value={1}>Popularity</Button>
            <Button disableRipple class={sortBy[2] ? "sort_button_clicked" : "sort_button"} onClick={handleClick} value={2}>Alphabetically</Button>
        </Box>
    )
}

export default SortBar;
