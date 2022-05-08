import { Typography, Box, Grid, List, ListItem, Button, Divider } from '@mui/material';
import { useContext, useEffect, useRef } from 'react'
import SortBar from './SortBar'
import { useNavigate } from 'react-router-dom'
import GlobalStoreContext from '../store';
import AuthContextProvider from '../auth'

export default function BookmarksScreen() {
    const firstRender = useRef(false);
    const {store} = useContext(GlobalStoreContext)
    const {auth} = useContext(AuthContextProvider)
    let navigate = useNavigate();

    useEffect(() => {
        if (firstRender.current) {
            if (store.mode === "comic") {
                store.loadBookmarks(auth.session.comic_bookmarks);
            }
            else {
                store.loadBookmarks(auth.session.story_bookmarks);
            }
        }
        firstRender.current = true;
    }, [store.mode])

    function loadWork(workId) {
        store.loadWork(workId);
        navigate("/" + store.mode + "/" + workId);
    }

    function handleUnbookmark(workId) {
        let session = auth.session;
        if (store.mode === "comic") {
            session.comic_bookmarks.splice(session.comic_bookmarks.indexOf(workId), 1);
        }
        else {
            session.story_bookmarks.splice(session.story_bookmarks.indexOf(workId), 1);
        }
        auth.updateUser(session);
    }

    return (
        <Box>
            <div id="bookmarks-title">
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
                        store.works.map((work, index) => (
                            <ListItem key={ "bookmark" + index } sx={{ height: '36px' }}>
                                <Grid item 
                                      container xs={12} 
                                      sx={{ 
                                            width: '100%', borderRadius: 1, display: 'flex', alignItems: 'flex-start', 
                                            justifyContent: 'flex-start', backgroundColor: (index % 2 === 0) ? '#2d2d2d' : 'none' 
                                          }}
                                >
                                    <Grid item xs={5}>
                                        <Button onClick = {() => loadWork(work._id)} sx={{ color: 'white', flexGrow: 1 }}>{ work.title }</Button>
                                    </Grid>
                                    <Grid item xs={6.5}>
                                        <Button onClick = {() => navigate('/chapter/')} sx={{ color: 'white', height: '100%' }}>{(work.chapters.length !== 0) ? work.chapters[work.chapters.length - 1] : ""}</Button>
                                    </Grid>
                                    <Grid item xs={0.5}>
                                        <Button onClick = {() => handleUnbookmark(work._id)} sx={{ color: '#9c4247', height: '100%' }}>Remove</Button>
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