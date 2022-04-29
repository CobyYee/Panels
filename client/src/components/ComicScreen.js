import { useContext, useState } from 'react'
import { Box, Grid, Button, List, ListItem } from '@mui/material';
//import { Typography, ListItemText, ListItemAvatar, Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom'
import GlobalStoreContext from '../store'
import AuthContextProvider from '../auth'

export default function ComicScreen() {
    const {store} = useContext(GlobalStoreContext)
    const {auth} = useContext(AuthContextProvider)
    let navigate = useNavigate()
    
    const [status, setStatus] = useState("chapters");

    function handleChapter(chapterId) {
        store.loadComicChapter(chapterId);
        if (store.work.published !== null) {
            navigate("/chapter/");
        }
        else {
            if (store.mode === "comic") {
                navigate("/editchapter/");
            }
            else {
                navigate("/storyeditor/");
            }
        }
    }

    /*
    let comment =
        <ListItem>
            <ListItemAvatar>
                <Avatar>
                    <AccountCircle/>
                </Avatar>
            </ListItemAvatar>
            <ListItemText primary={ <Typography color='white'>User</Typography> } secondary={ <Typography color='white'>comment</Typography> }/>
        </ListItem>

    if (status === "comments") {
        display =   <List>
                        { comment }
                        { comment }
                        { comment }
                    </List>
    }
    */

    function handleAuthor() {
        auth.loadProfile(store.work.creatorId);
        store.loadProfileWorks(store.work.creatorId);
    }

    return (
        <Box id="comic">
            <Grid id="comic_grid" item={true} xs={11} container>
                <Grid id="comic_info_grid" item xs={4}>
                    <Box id="comic_cover_box">
                        <img id="comic_cover" src={store.image} alt=""/>
                    </Box>
                </Grid>
                <Grid item xs={8} container>
                    <Grid item xs={12}>
                        <div id="comic_name">
                            {(store.work !== null) ? store.work.title : ""}
                        </div>
                    </Grid>
                    <Grid item xs={12}>
                        <div id="comic_creator_name" onClick={() => handleAuthor()}>
                            {(store.work !== null) ? store.work.creatorName : ""}
                        </div>
                    </Grid>
                    <Grid item xs={1}>
                        <div id="comic_info">
                            Views: {(store.work !== null) ? store.work.views : "0"}
                        </div>
                    </Grid>
                    <Grid item xs={11}>
                        <div id="comic_info">
                            Rating: {(store.work !== null && store.work.ratings.length > 0) ? 
                                store.work.ratings.reduce((total, rating) => total += rating.value, 0)/store.work.ratings.length 
                            : "0"}/5
                        </div>
                    </Grid>
                    <Grid id="comic_buttons" item xs={3.3}>
                        <Button id="comic_button" variant='contained' onClick = {() => navigate('/chapter/')}>Continue Reading</Button>
                        <Button id="comic_button" variant='contained'>Bookmark</Button>
                    </Grid>
                    <Grid item xs={12}>
                        <div id="comic_description_box">
                            <div id="comic_info">{(store.work !== null) ? store.work.description : ""}</div>
                        </div>
                    </Grid>
                </Grid>
            </Grid>
            <Grid id="comic_chapter_grid" item={true} xs={7} container spacing={2}>
                <Grid id="comic_chapter_buttons" item xs={2}>
                    <Button id="text_button" onClick={() => setStatus("chapters")}>Chapters</Button>
                    <Button id="text_button" onClick={() => setStatus("comments")}>Comments</Button>
                </Grid>
                <Grid className="comic_centered" item xs={12}>
                    <Box id="comic_chapters_box">
                    { 
                    (store.work !== null) ?
                        <List>
                        {
                            store.work.chapters.map((chapter, index) => (
                                <ListItem key={"chapter-card" + index} sx={{ p: '2px' }}>
                                    <div id="comic_chapter">
                                        <div id="comic_chapter_name" onClick={() => handleChapter(JSON.parse(chapter).id)}>
                                            {JSON.parse(chapter).name}
                                        </div>
                                        <div id="comic_chapter_date">Date Released</div>
                                    </div>
                                </ListItem>
                            ))
                        }
                        </List> : ""
                    }
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}