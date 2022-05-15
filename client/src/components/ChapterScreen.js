import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.bubble.css'
import { useState, useContext, useEffect } from 'react'
import { Typography, Box, Grid, Toolbar, Button, FormControl, Select, MenuItem, ImageList, ImageListItem } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom'
import GlobalStoreContext from '../store'

export default function ChapterScreen() {
    const {store} = useContext(GlobalStoreContext)
    let navigate = useNavigate()

    const [chapter, setChapter] = useState("");
    const [index, setIndex] = useState(0);

    useEffect(() => {
        if (store.chapter !== null) {
            setChapter(store.chapter.name);
        }
    }, [store.chapter])

    useEffect(() => {
        if (store.work !== null) {
            setIndex(currentIndex());
        }
    })

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

    function currentIndex() {
        return store.work.chapters.map(x => JSON.parse(x).id).indexOf(store.chapter._id);
    }

    function handleClickFirst() {
        changeChapter(JSON.parse(store.work.chapters[0]).id);
    }

    function handleClickPrev() {
        let index = currentIndex();

        changeChapter(JSON.parse(store.work.chapters[(index !== 0) ? index - 1 : 0]).id);
    }

    function handleClickNext() {
        let index = currentIndex();
        let last = store.work.chapters.length-1;

        changeChapter(JSON.parse(store.work.chapters[(index !== last) ? index + 1 : last]).id);
    }

    function handleClickLast() {
        changeChapter(JSON.parse(store.work.chapters[store.work.chapters.length-1]).id);
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
                        <Grid id="chapter_centered" item xs={3}>
                            <Button id="text_button_background" onClick = {() => navigate(((store.mode === "comic") ? "/comic/" : "/story/") + store.work._id)}>
                                <ArrowBackIcon/> back to {(store.work !== null) ? store.work.title : ""}
                            </Button>
                        </Grid>
                        <Grid id="chapter_centered" item xs={0.5}>
                            <Button id="button" disabled={index === 0} variant="contained" onClick={handleClickFirst}>First</Button>
                        </Grid>
                        <Grid id="chapter_centered" item xs={0.5}>
                            <Button id="button" disabled={index === 0} variant="contained" onClick={handleClickPrev}>Prev</Button>
                        </Grid>
                        <Grid id="chapter_centered" item xs={4}>
                            <FormControl sx={{ width: '60%' }}>
                                <Select id="chapter_select" value={chapter} onChange={switchChapter} 
                                    sx={{ color: 'white', 
                                          backgroundColor: '#3d3d3d',
                                          height: '48px',
                                          borderRadius: '25px',
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
                                        store.work.chapters.reverse().map((chapter, index) => (
                                            <MenuItem key={"chapter-select-" + index}
                                                      value={JSON.parse(chapter).name}
                                                      onClick={() => changeChapter(JSON.parse(chapter).id)}
                                            >
                                                <Typography>{"Chapter " + (index + 1) + ": " + JSON.parse(chapter).name}</Typography>
                                            </MenuItem>
                                        )) : ""
                                }
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid id="chapter_centered" item xs={0.5}>
                            <Button id="button" disabled={(store.work !== null) ? index === store.work.chapters.length - 1 : true} variant="contained" onClick={handleClickNext}>Next</Button>
                        </Grid>
                        <Grid id="chapter_centered" item xs={0.5}>
                            <Button id="button" disabled={(store.work !== null) ? index === store.work.chapters.length - 1 : true} variant="contained" onClick={handleClickLast}>Last</Button>
                        </Grid>
                        <Grid item xs={3}></Grid>
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