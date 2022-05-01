import { useState, useContext } from 'react'
import { Typography, Box, Grid, Toolbar, Button, FormControl, Select, MenuItem, ImageList, ImageListItem } from '@mui/material';
import { useNavigate } from 'react-router-dom'
import GlobalStoreContext from '../store'

export default function ChapterScreen() {
    const {store} = useContext(GlobalStoreContext)
    let navigate = useNavigate()

    const [chapter, setChapter] = useState(3)

    const switchChapter = (event) => {
        setChapter(event.target.value);
    }

    return (
        <div>
            <Box sx = {{ flexGrow: 1}}>
                <Toolbar>
                    <Grid item={true} xs={12} container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Grid item xs={2} sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Button onClick = {() => navigate('/comic/' + store.work._id)} sx={{ color: '#9c4247' }}>back to comicName</Button>
                        </Grid>
                        <Grid item xs={1} sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Button variant="contained" sx={{ backgroundColor: '#9c4247', "&:hover": { backgroundColor: '#b8434b' } }}>First</Button>
                        </Grid>
                        <Grid item xs={1} sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Button variant="contained" sx={{ backgroundColor: '#9c4247', "&:hover": { backgroundColor: '#b8434b' } }}>Prev</Button>
                        </Grid>
                        <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'center' }}>
                            <FormControl>
                                <Select value={chapter} onChange={switchChapter} sx={{backgroundColor: 'white'}}>
                                    <MenuItem value={3}>
                                        <Typography>Chapter 3</Typography>
                                    </MenuItem>
                                    <MenuItem value={2}>
                                        <Typography>Chapter 2</Typography>
                                    </MenuItem>
                                    <MenuItem value={1}>
                                        <Typography>Chapter 1</Typography>
                                    </MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={1} sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Button variant="contained" sx={{ backgroundColor: '#9c4247', "&:hover": { backgroundColor: '#b8434b' } }}>Next</Button>
                        </Grid>
                        <Grid item xs={1} sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Button variant="contained" sx={{ backgroundColor: '#9c4247', "&:hover": { backgroundColor: '#b8434b' } }}>Last</Button>
                        </Grid>
                        <Grid item xs={2}></Grid>
                    </Grid>
                </Toolbar>
            </Box>
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <ImageList sx={{ width: '30vw' }} cols={1}>
                {
                    (store.chapter_images !== null) ?
                        store.chapter_images.map((image, index) => (
                            <ImageListItem key={"chapter-image-" + index} sx={{ height: '200px' }}>
                                <img src={image} alt =""></img>
                            </ImageListItem>
                        )) : ""
                }
                </ImageList>
            </Box>
        </div>
    )
}