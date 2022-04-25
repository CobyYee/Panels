import { useState, useContext, useEffect } from 'react'
import { Typography, Box, Grid, Button, List, ListItem } from '@mui/material';
import GlobalStoreContext from '../store'

export default function EditChapterScreen() {
    const {store} = useContext(GlobalStoreContext)

    const [currentPage, setCurrentPage] = useState(1)
    const [currentImage, setCurrentImage] = useState(null);
    const [currentChapter, setCurrentChapter] = useState([]);

    useEffect(() => {
        setCurrentChapter(store.chapter_images);
    }, [store.chapter_images]);

    function handleSlide(index, image) {
        setCurrentPage(index + 1);
        setCurrentImage(image);
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <Grid item={true} xs={12} container sx={{ display: 'flex', justifyContent: 'center' }}>
                <Grid item xs={3} sx={{ display: 'flex', justifyContent: 'center', height: '91vh', overflowY: 'scroll' }}>
                    <Box sx={{ height: '100%', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <List sx={{ height: '100%', width: '100%' }}>
                        {
                            (currentChapter !== null) ? 
                                    currentChapter.map((image, index) => (
                                        <ListItem draggable="true" sx={{display: 'flex', justifyContent: 'center' }} onClick={() => handleSlide(index, image)}>
                                            <Typography pr={4} color='white'>{(index + 1) + "."}</Typography>
                                            <Box container sx={{ width: '60%', height: '40vh', display: 'flex', justifyContent: 'center' }}>
                                                <img src={image} className="chapter-contain" alt =""></img>
                                            </Box>
                                        </ListItem>
                                    )) : ""
                        }
                        </List>
                    </Box>
                </Grid>
                <Grid item xs={9} container>
                    <Grid item xs={12} sx={{ border: 1, borderColor: '#4e4e4e', height: '100%', width: '100%' }}>
                        <Grid item xs={12} sx={{ backgroundColor: '#4e4e4e', height: '48px', display: 'flex', verticalAlign: 'center' }}>
                            <Button sx={{ color: 'white' }}>Save</Button>
                            <Button sx={{ color: 'white' }}>Insert</Button>
                            <Button sx={{ color: 'white' }}>Edit</Button>
                            <Button sx={{ color: 'white' }}>Help</Button>
                        </Grid>
                        <Grid item xs={12} sx={{ height: '88vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Box sx={{ height: '95%', width: '95%', backgroundColor: '#4e4e4e', display: 'flex', justifyContent: 'center' }}>
                                <img src={currentImage} className="chapter-contain" alt =""></img>
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item={true} xs={12} container sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                <Grid item xs={3} sx={{ height: '3vh', display: 'flex', alignItems: 'center' }}>
                    <Box sx={{ borderTop: 1, borderColor: '#4e4e4e', height: '100%', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Typography color='white'>Page {currentPage} of {(currentChapter !== null) ? currentChapter.length : "0"}</Typography>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}