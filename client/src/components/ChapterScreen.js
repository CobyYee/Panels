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
                    <Grid id="chapter_grid_centered" item={true} xs={12} container>
                        <Grid id="chapter_centered" item xs={2}>
                            <Button id="text_button" onClick = {() => navigate('/comic/' + store.work._id)}>back to {store.work.title}</Button>
                        </Grid>
                        <Grid id="chapter_centered" item xs={1}>
                            <Button id="button" variant="contained">First</Button>
                        </Grid>
                        <Grid id="chapter_centered" item xs={1}>
                            <Button id="button" variant="contained">Prev</Button>
                        </Grid>
                        <Grid id="chapter_centered" item xs={4}>
                            <FormControl>
                                <Select id="chapter_select" value={chapter} onChange={switchChapter} 
                                    sx={{ color: 'white', 
                                          backgroundColor: '#3d3d3d',
                                          height: '48px',
                                          "& .MuiOutlinedInput-notchedOutline": { borderColor: 'transparent' }, 
                                          "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: 'transparent' },
                                          "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: '#9c4247' },
                                          "& .MuiSelect-icon": { color: 'white' }
                                    }}
                                    MenuProps={{
                                        PaperProps: {
                                          sx: { backgroundColor: '#3d3d3d', color: 'white' },
                                        },
                                    }}
                                    classes={{
                                        icon: { sx: { color: 'white' } }
                                    }}
                                >
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
                        <Grid id="chapter_centered" item xs={1}>
                            <Button id="button" variant="contained">Next</Button>
                        </Grid>
                        <Grid id="chapter_centered" item xs={1}>
                            <Button id="button" variant="contained">Last</Button>
                        </Grid>
                        <Grid item xs={2}></Grid>
                    </Grid>
                </Toolbar>
            </Box>
            <Box id="chapter_grid_centered" sx={{ width: '100%' }}>
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