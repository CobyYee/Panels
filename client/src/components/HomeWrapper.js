import { Typography, Box } from '@mui/material';
import SortBar from './SortBar';

export default function HomeWrapper() {
    console.log("hi")
    return (
        <div id = 'home-wrapper'>
            <Typography sx = {{left: '10%', fontSize: '100px'}}> HOME WRAPPER </Typography>
            <SortBar></SortBar>
        </div>
    )
}