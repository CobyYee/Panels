import { Box, Button, ListItem } from '@mui/material';
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import GlobalStoreContext from '../store';

export default function ProfileScreen(props) {
    const {store} = useContext(GlobalStoreContext)
    let navigate = useNavigate()

    let work = props.work;

    let buttons = 
        <div>
            <Button id="profile_text_button" onClick={() => handleChapter(work._id)}>Add Chapter</Button>
            <Button id="profile_text_button" onClick={() => handleDelete(work._id)}>Delete</Button>   
        </div> 
    
    if (work.published === null) {
        buttons = 
            <div>
                <Button id="profile_text_button" onClick={() => handlePublish(work._id)}>Publish</Button>
                <Button id="profile_text_button" onClick={() => handleChapter(work._id)}>Add Chapter</Button>
                <Button id="profile_text_button" onClick={() => handleEdit(work._id)}>Edit</Button>
                <Button id="profile_text_button" onClick={() => handleDelete(work._id)}>Delete</Button>
            </div>
    }

    function loadWork(cardId) {
        store.loadWork(cardId);
        navigate("/comic/" + cardId);
    }

    function handlePublish(publishId) {
        store.publish(publishId);
    }

    function handleChapter(workId) {
        store.loadWork(workId);
        navigate('/uploadchapter/');
    }

    function handleEdit(editId) {
        store.loadWork(editId);
        navigate('/editcomic/')
    }

    function handleDelete(deleteId) {
        store.deleteWork(deleteId);
    }

    return (
        <ListItem>
            <Box sx={{ borderRadius: 1, width: '100%', height: '32px', display: 'flex', alignItems: 'center' }}>
                <Box sx={{ flexGrow: 1 }}>
                    <Button onClick = {() => loadWork(work._id)} sx={{ color: 'white', flexGrow: 1 }}>{work.title}</Button>
                </Box>
                {buttons}
            </Box>
        </ListItem>
    )
}