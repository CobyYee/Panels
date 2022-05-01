import { useState, useContext, useEffect } from 'react'
import { Typography, Box, Grid, Button, List, ListItem, Modal } from '@mui/material';
import GlobalStoreContext from '../store'

export default function EditChapterScreen() {
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

    function saveChapter() {
        console.log("Saving chapter");
        store.chapter.images = chapterImageIds;
        store.updateChapter(store.chapter);
        console.log("SAVED");
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
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <Grid item={true} xs={12} container sx={{ display: 'flex', justifyContent: 'center' }}>
                <Grid item xs={3} sx={{ display: 'flex', justifyContent: 'center', height: '91vh', overflowY: 'scroll' }}>
                    <Box sx={{ height: '100%', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <List sx={{ height: '100%', width: '100%' }}>
                        {
                            (currentChapter !== null) ? 
                                    currentChapter.map((image, index) => (
                                        <ListItem key={"image-edit-" + index} sx={{display: 'flex', justifyContent: 'center' }}>
                                            <Typography pr={4} color='white'>{(index + 1) + "."}</Typography>
                                            <Box container sx={{ width: '60%', height: '40vh', display: 'flex', justifyContent: 'center' }}>
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
                    <Grid item xs={12} sx={{ border: 1, borderColor: '#4e4e4e', height: '100%', width: '100%' }}>
                        <Grid item xs={12} sx={{ backgroundColor: '#4e4e4e', height: '48px', display: 'flex', verticalAlign: 'center' }}>
                            <Button sx={{ color: 'white' }} onClick={() => saveChapter()}>Save</Button>
                            <Button sx={{ color: 'white' }} onClick={handleModalOpen}>Insert</Button>
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
                        <Typography color='white'>Page {currentPage + 1} of {(currentChapter !== null) ? currentChapter.length : "0"}</Typography>
                    </Box>
                </Grid>
            </Grid>
            <Modal
                open={modalOpen}
                onClose={handleModalClose}>
                <Box sx={{ position: 'absolute', top: '30%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: '#3d3d3d', p: 2, borderRadius: 2 }}>
                    <Typography color="white" sx={{ fontSize: 20 }} mb={2}>Insert Panel</Typography>
                    <Button variant="contained" component="label" sx={{ backgroundColor: '#9c4247', "&:hover": { backgroundColor: '#b8434b' } }}>
                        Browse Files
                        <input type="file" hidden onChange={(event) => {handleFileUpload(event)}} />
                    </Button>
                    <Typography color="white" mt={2} mb={4}>Uploaded: {fileName}</Typography>
                    <Button variant="contained" sx={{ backgroundColor: '#9c4247', "&:hover": { backgroundColor: '#b8434b' } }} onClick={() => handleInsert()}>Upload</Button><Button variant="contained" sx={{ backgroundColor: '#4e4e4e' }} onClick={handleModalClose}>Cancel</Button>
                </Box>
            </Modal>
        </Box>
    )
}