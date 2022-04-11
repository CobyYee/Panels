import { Typography, Box, Grid } from '@mui/material';
import ContentContext from '../content'
import {useContext} from 'react'
import SortBar from './SortBar'

export default function BookmarksScreen() {
    const {content} = useContext(ContentContext)

    let latestUpdates = [["Work 1", "1"], ["Work 2", "21"], ["Work 3", "14"], ["Work 4", "1123"], ["Work 5", "41"], ["Work 6", "11"], ["Work 7", "12"], ["Work 8", "1"], 
        ["Work 9", "1"], ["Work 10", "1"], ["Work 11", "1"], ["Work 12", "1"], ["Work 13", "1"], ["Work 14", "1"], ["Work 15", "1"], ["Work 16", "1"], ["Work 17", "1"], 
        ["Work 18", "1"], ["Work 19", "1"], ["Work 21", "1"], ["Work 21", "1"], ["Work 22", "1"], ["Work 23", "1"], ["Work 24", "1"], ["Work 24", "1"], ["Work 26", "1"], 
        ["Work 27", "1"], ["Work 28", "1"]]

    for(let i = 0; i < latestUpdates.length; i++) {
        if(content.contentType === "Story")
            latestUpdates[i][0] = "Story" + (i+1)
        else 
            latestUpdates[i][0] = "Comic" + (i+1)
    }

    let firstColUpdates = "";
    for(let i = 0; i < 14; i++) {
        let missingLen = 100 - latestUpdates[i][0].length - 4 - latestUpdates[i][1].length
        let str = latestUpdates[i][0]
        for(let j = 0; j < missingLen; j++)
            str += '.'
        str += "Ch. " + latestUpdates[i][1]
        firstColUpdates += str + "\n"
    }

    let secondColUpdates = "";
    for(let i = 14; i < 28; i++) {
        let missingLen = 100 - latestUpdates[i][0].length - 4 - latestUpdates[i][1].length
        let str = latestUpdates[i][0]
        for(let j = 0; j < missingLen; j++)
            str += '.'
        str += "Ch. " + latestUpdates[i][1]
        secondColUpdates += str + "\n"
    }

    let firstCol = 
        <Typography sx = {{color: 'white', position: 'relative', textAlign: 'center'}}>
            {firstColUpdates}
        </Typography>
    let secondCol = 
        <Typography sx = {{color: 'white', position: 'relative', textAlign: 'center'}}>
            {secondColUpdates}  
        </Typography>



    return (
        <Box>
            <div id = "bookmarks-title">
                Your Bookmarks
            </div>
            <div className="search_list">
                <SortBar />
            </div>  
            <Box xs={12} sx = {{ position: 'relative', border: 1 , borderColor: '#4e4e4e',  width: '80%', height: '100%', borderRadius: '15px', left: '10%', maxWidth: '1780px' }}>

                        <Grid container sx = {{ display: 'flex', p: 1, maxWidth: '1780px' }}>
                            <Grid item xs = {6} sx={{p: 1}}>
                                {firstCol}
                            </Grid>
                            <Grid item xs = {6} sx={{p: 1}}> 
                                {secondCol}
                            </Grid>
                        </Grid>

                    </Box>
        </Box>
    )
}