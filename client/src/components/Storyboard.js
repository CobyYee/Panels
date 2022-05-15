import { GlobalStoreContext }  from '../store';
import  AuthContextProvider  from '../auth';
import { useContext, useState, useRef, useEffect } from 'react'
import { Grid, Button, TextField, Box } from '@mui/material'
import { useNavigate } from "react-router-dom";
import exStory from '../testimgs/exStory.jpg';
//import exComic from '../testimgs/exComic.jpg';
import Editor from './Editor';
//import Konva from 'konva'
//import {Stage, Layer, Rect, Line, Text} from 'react-konva'

function StoryBoard(props) {
    const { store } = useContext(GlobalStoreContext);
    const {auth} = useContext(AuthContextProvider);
    const [tool, setTool] = useState('pen');
    const [lines, setLines] = useState([]);
    const [trash, setTrash] = useState([]);
    const isDrawing = useRef(false);
    const stageRef = useRef(null);
    let navigate = useNavigate();

    function handleSave(event) {
        console.log(stageRef.current.toDataURL());
        console.log(stageRef.current.toJSON()); 
        props.setStoryboardOpen(false)
        // store.createKonva(stageRef.current.toDataURL());
        // navigate('/profile/' + auth.session._id)
    }

    let editor = "";
    if(store.mode === "comic") {
        editor = 
        <Box sx={{ height: '1500px', position: 'relative', backgroundColor: 'white', borderRadius: '10px', width: '1500px'}}>
            <Editor tool={tool} setTool={setTool} lines={lines} setLines={setLines} trash={trash} setTrash={setTrash} isDrawing={isDrawing} stageRef={stageRef} image={props.currentImage}/>
        </Box>
    }
    else {
        editor = <Box sx={{ height: '80vh', position: 'relative', backgroundColor: 'black', borderRadius: '10px', width: '90%', left: '5%'}}>
            <img src={exStory} style={{ width: '100%', height: '100%' }} alt=""/>
        </Box>
    }

    let component = 
        <Grid container sx = {{ flexDirection: 'row', position: 'absolute', top: '66px', left: '0px', zIndex: '99', backgroundColor: '#2b2b2b', overflowY: 'auto'}}>
            <Grid item xs = {3} >
                <Button variant="text" onClick = {() => navigate('/profile/')} sx = {{color: 'white', fontSize: '28px'}}>Back to Profile</Button>
            </Grid>
            <Grid item xs = {6} sx = {{display: 'flex', justifyContent:'center'}} >
                <TextField placeholder = "Name" sx = {{input: {color: 'white'}}}>  </TextField>
            </Grid>
            <Grid item xs = {3}/>
            <Grid item xs = {12} style={{justifyContent: 'center', display: 'flex'}}>
                {editor}
            </Grid>
            <Grid item xs = {10}/>
            <Grid item xs = {1}>
                <Button variant="contained" sx={{ backgroundColor:'#9c4247', "&:hover":  { backgroundColor: 'red' } }} onClick={handleSave}>Save</Button>
            </Grid>
            <Grid item xs = {1}>
                <Button variant="contained" sx={{ backgroundColor:'#9c4247', "&:hover": { backgroundColor: 'red' } }}>Publish</Button>
            </Grid>
        </Grid>
        
        return (component)
}

export default StoryBoard;