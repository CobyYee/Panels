import { Box, Grid, List, ListItem, Button, Divider } from '@mui/material';
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

    function handleChapter(workId, chapterId) {
        store.loadWorkAndChapter(workId, chapterId); 
        navigate("/chapter/" + chapterId);
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
        store.removeBookmark(workId);
    }

    return (
        <div>
            <div id="bookmarks-title">
                Your Bookmarks
            </div>
            <div className="search_list">
                <SortBar />
            </div>  
            <Box id="bookmarks_container" xs={12}>
                <Grid id="bookmarks_label_container" container item xs={12}>
                    <Grid item xs={4.9}>
                        <div id="bookmarks_label">Name</div>
                    </Grid>
                    <Grid item xs={1}>
                        <div id="bookmarks_label">Latest</div>
                    </Grid>
                </Grid>
                <Divider id="bookmarks_divider" pt={4}/>
                <Grid item xs = {12}>
                    <List id="bookmarks_list">
                    {
                        store.works.map((work, index) => (
                            <ListItem key={"bookmark" + index} id="bookmarks_item">
                                <Grid id={(index % 2 === 0) ? "bookmarks_even" : "bookmarks_odd"}
                                      item 
                                      container xs={12}>
                                    <Grid item xs={5}>
                                        <Button onClick={() => loadWork(work._id)} sx={{ color: 'white' }}>{ work.title }</Button>
                                    </Grid>
                                    <Grid item xs={6.5}>
                                    {
                                        (work.chapters.length > 0) ?
                                            <Button onClick={() => handleChapter(work._id, JSON.parse(work.chapters[work.chapters.length - 1]).id)} 
                                                    sx={{ color: 'white' }}>
                                            {
                                                (work.chapters.length > 0) ? JSON.parse(work.chapters[work.chapters.length - 1]).name : ""
                                            }
                                            </Button>
                                        : ""
                                    }
                                    </Grid>
                                    <Grid item xs={0.5}>
                                        <Button onClick={() => handleUnbookmark(work._id)} sx={{ color: '#9c4247' }}>Remove</Button>
                                    </Grid>
                                </Grid>
                            </ListItem>
                        ))
                    }
                    </List>
                </Grid>
            </Box>
        </div>
    )
}