import { useContext, useEffect, useState } from 'react'
import { Box, Grid, Button, List, ListItem } from '@mui/material';
import Rating from '@mui/material/Rating';
//import { Typography, ListItemText, ListItemAvatar, Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom'
import GlobalStoreContext from '../store'
import AuthContextProvider from '../auth'
import Comments from './Comments';

export default function ComicScreen() {
    const {store} = useContext(GlobalStoreContext)
    const {auth} = useContext(AuthContextProvider)
    let navigate = useNavigate()
    
    const [status, setStatus] = useState("chapters");
    const [rating, setRating] = useState(0);

    useEffect(() => {
        if (store.work !== null && store.work.ratings.length > 0) {
            setRating(store.work.ratings.reduce((total, rating) => total += JSON.parse(rating).rating, 0)/store.work.ratings.length);
        }
    }, [store.work])

    function handleChapter(chapterId) {
        if (store.mode === "comic") {
            store.loadComicChapter(chapterId);
        }
        else {
            store.loadStoryChapter(chapterId);
        }
        if (store.work.published !== null) {
            
        }   
        navigate("/chapter/");
    }

    function handleEdit(chapterId) {
        if (store.mode === "comic") {
            store.loadComicChapter(chapterId);
            navigate("/comiceditor/");
        }
        else {
            store.loadStoryChapter(chapterId).then(res => {navigate("/storyeditor/")}).catch(err => {console.log("story chapter edit error : " + err)});
        }
    }

    /*
    let comment =
        <ListItem>
            <ListItemAvatar>k
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

    function handleBookmark() {
        let session = auth.session;
        if (session === null) {
            return;
        }
        if (store.mode === "comic") {
            session.comic_bookmarks.push(store.work._id);
        }
        else {
            session.story_bookmarks.push(store.work._id);
        }
        auth.updateUser(session);
    }

    function handleUnbookmark() {
        let session = auth.session;
        if (store.mode === "comic") {
            session.comic_bookmarks.splice(session.comic_bookmarks.indexOf(store.work._id), 1);
        }
        else {
            session.story_bookmarks.splice(session.story_bookmarks.indexOf(store.work._id), 1);
        }
        auth.updateUser(session);
    }

    function handleRating(newRating) {
        store.addRating(auth.session._id, newRating);
        setRating(store.work.ratings.reduce((total, rating) => total += JSON.parse(rating).rating, 0)/store.work.ratings.length);
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
<<<<<<< HEAD
                        <div id="comic_kinfo">
                            Rating: {(store.work !== null && store.work.ratings.length > 0) ? 
                                store.work.ratings.reduce((total, rating) => total += rating.value, 0)/store.work.ratings.length 
                            : "0"}/5
=======
                        <div id="comic_info">
                            <Rating name="work_rating" value={rating} precision={0.1} onChange={(event, value) => handleRating(value)}/>
>>>>>>> 0bd5b1dec7dfe574b0467ed45008e324793b45c0
                        </div>
                    </Grid>
                    <Grid id="comic_buttons" item xs={3.3}>
                        <Button id="comic_button" variant='contained' onClick={() => navigate('/chapter/')}>Continue Reading</Button>
                        <Button id="comic_button" variant='contained' onClick={() => handleBookmark()}>Bookmark</Button>
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
                                            {"Chapter " + (index + 1) + ": " + JSON.parse(chapter).name}
                                        </div>
                                        {
<<<<<<< HEAD
                                            (auth.session && store.work.creatorId === auth.session._id) ? 
=======
                                            (auth.session !== null && store.work.creatorId === auth.session._id) ? 
>>>>>>> 0bd5b1dec7dfe574b0467ed45008e324793b45c0
                                                <Button id="text_button" sx={{ height: '26px' }} onClick={() => handleEdit(JSON.parse(chapter).id)}>Edit</Button>
                                            : <div id="comic_chapter_date">Date Released</div>
                                        }
                                    </div>
                                </ListItem>
                            ))
                        }
                        </List> : ""
                    }
                    </Box>
                </Grid>
                <Comments url={"1234"} id={"4321"} title={"example"}/>
            </Grid>
        </Box>
    )
}