import { Typography, Box, Grid, List, ListItem, Button, Divider } from '@mui/material';
import ContentContext from '../content'
import { useContext } from 'react'
import SortBar from './SortBar'
import { useNavigate } from 'react-router-dom'

export default function BookmarksScreen() {
    const {content} = useContext(ContentContext)
    let navigate = useNavigate();

    let latestUpdates = [["Work 1", "1"], ["Work 2", "21"], ["Work 3", "14"], ["Work 4", "1123"], ["Work 5", "41"], ["Work 6", "11"], ["Work 7", "12"], ["Work 8", "1"], 
        ["Work 9", "1"], ["Work 10", "1"], ["Work 11", "1"], ["Work 12", "1"], ["Work 13", "1"], ["Work 14", "1"], ["Work 15", "1"], ["Work 16", "1"], ["Work 17", "1"], 
        ["Work 18", "1"], ["Work 19", "1"], ["Work 21", "1"], ["Work 21", "1"], ["Work 22", "1"], ["Work 23", "1"], ["Work 24", "1"], ["Work 24", "1"], ["Work 26", "1"], 
        ["Work 27", "1"], ["Work 28", "1"]]

    return (
        <Box>
            <div id = "bookmarks-title">
                Your Bookmarks
            </div>
            <div className="search_list">
                <SortBar />
            </div>  
            <Box xs={12} sx = {{ position: 'relative', width: '80%', height: '100%', left: '10%', maxWidth: '1780px' }}>
                <Grid pt={4} container item xs={12} sx={{ width: '100%', borderRadius: 1, display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start', position: 'relative', left: '1.5%' }}>
                    <Grid item xs={4.9}>
                        <Typography sx={{ color: 'white', fontSize: 20 }}>Name</Typography>
                    </Grid>
                    <Grid item xs={1}>
                        <Typography sx={{ color: 'white', fontSize: 20 }}>Latest</Typography>
                    </Grid>
                </Grid>
                <Divider pt={4} sx={{ backgroundColor: '#4e4e4e', width: '98%', position: 'relative', left: '1%' }}/>
                <Grid item xs = {12}>
                    <List sx={{ width: '100%', height: '100%' }}>
                    {
                        latestUpdates.map((work, index) => (
                            <ListItem key={ "bookmark" + index } sx={{ height: '36px' }}>
                                <Grid item 
                                      container xs={12} 
                                      sx={{ 
                                            width: '100%', borderRadius: 1, display: 'flex', alignItems: 'flex-start', 
                                            justifyContent: 'flex-start', backgroundColor: (index % 2 === 0) ? '#2d2d2d' : 'none' 
                                          }}
                                >
                                    <Grid item xs={5}>
                                        <Button onClick = {() => navigate('/comic/')} sx={{ color: 'white', flexGrow: 1 }}>{ work[0] }</Button>
                                    </Grid>
                                    <Grid item xs={6.5}>
                                        <Button onClick = {() => navigate('/chapter/')} sx={{ color: 'white', height: '100%' }}>Chapter { work[1] }</Button>
                                    </Grid>
                                    <Grid item xs={0.5}>
                                        <Button onClick = {() => navigate('/chapter/')} sx={{ color: 'white', height: '100%' }}>Remove</Button>
                                    </Grid>
                                </Grid>
                            </ListItem>
                        ))
                    }
                    </List>
                </Grid>
            </Box>
        </Box>
    )
}