import { useState } from 'react'
import { Typography, Button, Box } from '@mui/material';

function SortBar() {
    const [sortBy, setSortBy] = useState(0);

    return (
        <Box class="sort_bar">
            <Typography class="sort_label">Sort By:</Typography>
            <Button class="sort_by_button">Latest Updated</Button>
            <Button class="sort_by_button">Popularity</Button>
            <Button class="sort_by_button">Alphabetically</Button>
        </Box>
    )
}

export default SortBar;
