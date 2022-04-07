import { Typography, Box } from '@mui/material';
import SortBar from './SortBar';
import GenreBar from './GenreBar';

export default function HomeWrapper() {
    return (
        <div id='home-wrapper' class="home-wrapper">
            <SortBar></SortBar>
            <GenreBar state={[false, false, false]}></GenreBar>
        </div>
    )
}