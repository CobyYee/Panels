import { useContext, useEffect, useState } from 'react'
import { Box, Grid, Button, List, ListItem } from '@mui/material';
import Rating from '@mui/material/Rating';
//import { Typography, ListItemText, ListItemAvatar, Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom'
import GlobalStoreContext from '../store'
import AuthContextProvider from '../auth'
//import Comments from './Comments';

export default function WorkScreen() {
    const {store} = useContext(GlobalStoreContext)
    const {auth} = useContext(AuthContextProvider)
    let navigate = useNavigate()
    const [rating, setRating] = useState(0);

    useEffect(() => {
        if (store.work !== null && store.work.ratings.length > 0) {
            setRating(store.work.ratings.reduce((total, rating) => total += JSON.parse(rating).rating, 0)/store.work.ratings.length);
        }
    }, [store.work])

    function handleChapter(workId, chapterId) {
        if (store.mode === "comic") {
            store.loadComicChapter(chapterId);
        }
        else {
            store.loadStoryChapter(chapterId);
        }
        navigate(((store.mode === "comic") ? "/comic/" : "/story/") + workId + "/chapter/" + chapterId);
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

    /**
    *  RECOMMENDED CONFIGURATION VARIABLES: EDIT AND UNCOMMENT THE SECTION BELOW TO INSERT DYNAMIC VALUES FROM YOUR PLATFORM OR CMS.
    *  LEARN WHY DEFINING THESE VARIABLES IS IMPORTANT: https://disqus.com/admin/universalcode/#configuration-variables    */
    
    var disqus_config = function () {
        this.page.url = `http://localhost:3000/comic/${store.work._id}`;  // Replace PAGE_URL with your page's canonical URL variable
        this.page.identifier = `${store.work._id}`; // Replace PAGE_IDENTIFIER with your page's unique identifier variable
        this.page.title = `${store.work.title}`
    };
    
    (function() { // DON'T EDIT BELOW THIS LINE
    var d = document, s = d.createElement('script');
    s.src = 'https://panelswebcomics-1.disqus.com/embed.js';
    s.setAttribute('data-timestamp', +new Date());
    (d.head || d.body).appendChild(s);
    })();

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
                            <Rating name="work_rating" value={rating} precision={0.1} onChange={(event, value) => handleRating(value)}/>
                        </div>
                    </Grid>
                    <Grid id="comic_buttons" item xs={3.3}>
                        {
                            (auth.session !== null && store.work !== null && store.work.published !== null) ?
                                ((((store.mode === "comic" && auth.session.comic_bookmarks.includes(store.work._id)) || (store.mode === "story" && auth.session.story_bookmarks.includes(store.work._id)) ?
                                    ( <Button id="comic_button" variant='contained' onClick={() => handleUnbookmark()}>Unbookmark</Button> ) :
                                    ( <Button id="comic_button" variant='contained' onClick={() => handleBookmark()}>Bookmark</Button> )
                                ))) : ( <Button id="comic_button" variant='contained' disabled={true}>Bookmark</Button> )
                        }
                    </Grid>
                    <Grid item xs={12}>
                        <div id="comic_description_box">
                            <div id="comic_info">{(store.work !== null) ? store.work.description : ""}</div>
                        </div>
                    </Grid>
                </Grid>
            </Grid>
            <Grid id="comic_chapter_grid" item={true} xs={7} container spacing={2}>
                <Grid className="comic_centered" item xs={12}>
                    <Box id="comic_chapters_box">
                    { 
                    (store.work !== null) ?
                        <List>
                        {
                            store.work.chapters.map((chapter, index) => (
                                <ListItem key={"chapter-card" + index} sx={{ p: '2px' }}>
                                    <div id="comic_chapter">
                                        <div id="comic_chapter_name" onClick={() => handleChapter(store.work._id, JSON.parse(chapter).id)}>
                                            {"Chapter " + (index + 1) + ": " + JSON.parse(chapter).name}
                                        </div>
                                        {
                                            (auth.session !== null && store.work.creatorId === auth.session._id) ? 
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
                <div id="disqus_thread" style={{width: '100%'}}></div>
                    
                <noscript>Please enable JavaScript to view the <a href="https://disqus.com/?ref_noscript">comments powered by Disqus.</a></noscript>
            </Grid>
        </Box>
    )
}