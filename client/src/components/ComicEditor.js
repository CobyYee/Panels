import { useState, useContext, useEffect } from 'react'
import { Typography, Box, Grid, Button, List, ListItem, Modal } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import GlobalStoreContext from '../store'

export default function ComicEditor() {
    const {store} = useContext(GlobalStoreContext)

    const [currentPage, setCurrentPage] = useState(0);
    const [currentImage, setCurrentImage] = useState(null);
    const [chapterImageIds, setChapterImageIds] = useState([]);
    const [currentChapter, setCurrentChapter] = useState([]);

    const [modalOpen, setModalOpen] = useState(false);
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState("");

    useEffect(() => {
        setCurrentChapter(store.chapter_images);
    }, [store.chapter_images]);

    useEffect(() => {
        if (store.chapter !== null) {
            setChapterImageIds(store.chapter.images);
        }
    }, [store.chapter])

    function handleSlide(index, image) {
        setCurrentPage(index);
        setCurrentImage(image);
    }

    function handleDragStart(event) {
        event.dataTransfer.setData("item", event.target.id);
        //console.log(event.target.id);
    }

    function handleDragOver(event) {
        event.preventDefault();
        event.stopPropagation();
    }

    function handleDrop(event) {
        //console.log(event.target.id);
        let sourceId = event.dataTransfer.getData("item");
        let targetId = event.target.id;
        sourceId = sourceId.substring(sourceId.indexOf("-") + 1);
        targetId = targetId.substring(targetId.indexOf("-") + 1);
        //console.log(sourceId + " " + targetId);
        let temp = currentChapter.slice();
        let removed = temp.splice(sourceId, 1);
        removed = temp.splice(targetId, 0, removed[0]);
        setCurrentChapter(temp);
        temp = chapterImageIds.slice();
        removed = temp.splice(sourceId, 1);
        removed = temp.splice(targetId, 0, removed[0]);
        setChapterImageIds(temp);
    }

    const navigate = useNavigate();
    function saveChapter() {
        console.log("Saving chapter");
        store.chapter.images = chapterImageIds;
        store.updateChapter(store.chapter);
        console.log("SAVED");
        navigate("/comic/" + store.work._id);
    }

    function handleFileUpload(event) {
        const reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        reader.onload = function() {
            setFileName(event.target.files[0].name)
            setFile(reader.result);
        }
        reader.onerror = function (error) {
            console.log("File onload error: " + error);
        }
    }

    const handleModalOpen = () => setModalOpen(true);
    const handleModalClose = () => setModalOpen(false);

    function handleInsert() {
        console.log("inserting panel");
        let temp = currentChapter.slice();
        temp.splice(currentPage + 1, 0, file);
        setCurrentChapter(temp);
        handleModalClose();
    }

    return (
        <Box id="edit_container" className="edit_chapter_centered">
            <Grid className="edit_chapter_centered" item={true} xs={12} container>
                <Grid id="edit_slides" className="edit_chapter_centered" item xs={3}>
                    <Box id="edit_slides_container" className="edit_chapter_centered">
                        <List id="edit_slides_list" 
                              sx={{ "&& .Mui-selected": { backgroundColor: '#3d3d3d', border: 1, borderColor: 'white' } }}
                        >
                        {
                            (currentChapter !== null) ? 
                                currentChapter.map((image, index) => (
                                    <ListItem key={"image-edit-" + index} 
                                              id="edit_image_panel" 
                                              className="edit_chapter_centered" 
                                              selected={currentPage === index}
                                    >
                                        <Typography color='white' pr={4}>{(index + 1) + "."}</Typography>
                                        <Box id="edit_image_container" className="edit_chapter_centered" container>
                                            <img src={image} 
                                                 className="chapter-contain" 
                                                 alt =""
                                                 id={'item-' + index}
                                                 draggable="true" 
                                                 onDragStart={handleDragStart}
                                                 onDragOver={handleDragOver}
                                                 onDrop={handleDrop}
                                                 onClick={() => handleSlide(index, image)}>
                                            </img>
                                        </Box>
                                    </ListItem>
                                )) : ""
                        }
                        </List>
                    </Box>
                </Grid>
                <Grid item xs={9} container>
                    <Grid id="edit_toolbar" item xs={12}>
                        <Grid id="edit_toolbar_buttons" item xs={12}>
                            <Button sx={{ color: 'white' }} onClick={saveChapter}>Save</Button>
                            <Button sx={{ color: 'white' }} onClick={handleModalOpen}>Insert</Button>
                            <Button sx={{ color: 'white' }}>Edit</Button>
                            <Button sx={{ color: 'white' }}>Help</Button>
                        </Grid>
                        <Grid id="edit_display_grid" className="edit_chapter_centered" item xs={12}>
                            <Box id="edit_image_container" className="edit_chapter_centered">
                                <img src={currentImage} className="edit_image" alt =""></img>
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item={true} xs={12} container sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                <Grid className="edit_chapter_centered" item xs={3} sx={{ height: '3vh' }}>
                    <Box id="edit_currentpage" className="edit_chapter_centered">
                        <Typography color="white">Page {currentPage + 1} of {(currentChapter !== null) ? currentChapter.length : "0"}</Typography>
                    </Box>
                </Grid>
            </Grid>
            <Modal
                open={modalOpen}
                onClose={handleModalClose}>
                <Box id="insert_panel_modal">
                    <Typography id="modal_title">Insert Panel</Typography>
                    <Button id="button" variant="contained" component="label">
                        Browse Files
                        <input type="file" hidden onChange={(event) => {handleFileUpload(event)}} />
                    </Button>
                    <Typography id="modal_filename">Uploaded: {fileName}</Typography>
                    <Button id="button" variant="contained" onClick={() => handleInsert()}>Upload</Button>
                    <Button id="cancel_button" onClick={handleModalClose}>Cancel</Button>
                </Box>
            </Modal>
        </Box>
    )
}