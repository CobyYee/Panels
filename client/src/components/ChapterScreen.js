import { useState, useContext } from 'react'
import { Typography, Box, Grid, Toolbar, Button, FormControl, Select, MenuItem, ImageList, ImageListItem } from '@mui/material';
import { useNavigate } from 'react-router-dom'
import batePic from '../testimgs/bate.jpg'
import GlobalStoreContext from '../store'

export default function ChapterScreen() {
    const {store} = useContext(GlobalStoreContext)
    let navigate = useNavigate()

    const [chapter, setChapter] = useState(3)

    const switchChapter = (event) => {
        setChapter(event.target.value)
    }

    const testChapter = [batePic, batePic, batePic];

    return (
        <div>
            <Box sx = {{ flexGrow: 1}}>
                <Toolbar>
                    <Grid item={true} xs={12} container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Grid item xs={2} sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Button onClick = {() => navigate('/comic/')} sx={{ color: '#9c4247' }}>back to comicName</Button>
                        </Grid>
                        <Grid item xs={1} sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Button variant="contained" sx={{ backgroundColor: '#9c4247', "&:hover": { backgroundColor: 'red' } }}>First</Button>
                        </Grid>
                        <Grid item xs={1} sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Button variant="contained" sx={{ backgroundColor: '#9c4247', "&:hover": { backgroundColor: 'red' } }}>Prev</Button>
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
                            <Button variant="contained" sx={{ backgroundColor: '#9c4247', "&:hover": { backgroundColor: 'red' } }}>Next</Button>
                        </Grid>
                        <Grid item xs={1} sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Button variant="contained" sx={{ backgroundColor: '#9c4247', "&:hover": { backgroundColor: 'red' } }}>Last</Button>
                        </Grid>
                        <Grid item xs={2}></Grid>
                    </Grid>
                </Toolbar>
            </Box>
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <ImageList sx={{ width: '30vw' }} cols={1}>
                {
                    testChapter.map((image, index) => {
                        return (
                            <ImageListItem key={"chapter-image-" + index} sx={{ height: '200px' }}>
                                <img src={image} alt ="Pic"></img>
                            </ImageListItem>
                        )
                    })
                }
                </ImageList>
            </Box>
        </div>
    )
}