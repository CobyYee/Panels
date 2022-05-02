import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.bubble.css'
import { useState, useContext } from 'react'
import { Typography, Box, Grid, Toolbar, Button, FormControl, Select, MenuItem, ImageList, ImageListItem } from '@mui/material';
import { useNavigate } from 'react-router-dom'
import GlobalStoreContext from '../store'

export default function ChapterScreen() {
    const {store} = useContext(GlobalStoreContext)
    let navigate = useNavigate()

    const [chapter, setChapter] = useState(JSON.parse(store.work.chapters[store.work.chapters.length - 1]).name);

    const switchChapter = (event) => {
        setChapter(event.target.value);
    }

    function changeChapter(chapterId) {
        if (store.mode === "comic") {
            store.loadComicChapter(chapterId);
        }
        else {
            store.loadStoryChapter(chapterId);
        }
    }

    let display =
        <ImageList sx={{ width: '30vw' }} cols={1}>
        {
            (store.chapter_images !== null) ?
                store.chapter_images.map((image, index) => (
                    <ImageListItem key={"chapter-image-" + index}>
                        <img src={image} alt =""></img>
                    </ImageListItem>
                )) : ""
        }
        </ImageList>

    if (store.mode === "story") {
        display = 
            <Box sx={{ width: '50vw', color: 'white' }}>
            {
                (store.chapter !== null) ?
                    <ReactQuill style={{ backgroundColor: '#3d3d3d', borderRadius: '4px' }} 
                                readOnly={true} 
                                theme={"bubble"} 
                                value={store.chapter.chapter}
                    />
                : ""
            }
            </Box>
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
                                {
                                    (store.work !== null) ?
                                        store.work.chapters.reverse().map((chapter) => (
                                            <MenuItem value={JSON.parse(chapter).name} onClick={() => changeChapter(JSON.parse(chapter).id)}>
                                                <Typography>{JSON.parse(chapter).name}</Typography>
                                            </MenuItem>
                                        )) : ""
                                }
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
            {
                display
            }
            </Box>
        </div>
    )
}