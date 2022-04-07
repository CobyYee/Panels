import { useState } from 'react'
import { Typography, Box } from '@mui/material';

function SortBar() {
    const [sortBy, setSortBy] = useState(0);

    return (
        <Box class="sort_bar_button">
            <Typography class="sort_label">Sort By:</Typography>
            <Typography class="sort_by_button">Latest Updated</Typography>
            <Typography class="sort_by_button">Popularity</Typography>
            <Typography class="sort_by_button">Alphabetically</Typography>
        </Box>
    )
}

export default SortBar;
