import Quill from 'quill'
import 'react-quill/dist/quill.snow.css';
import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Grid, TextField } from '@mui/material'
import GlobalStoreContext from '../store'
import AuthContextProvider from '../auth'
import ReactQuill from 'react-quill';

export default function StoryEditor() {
    const {store} = useContext(GlobalStoreContext)
    const {auth} = useContext(AuthContextProvider)
    const navigate = useNavigate();
    const [text, setText] = useState("")

    let div = <ReactQuill id = "story-editor" defaultValue = {store.chapter.chapter} theme="snow" onChange={(content, delta, source, editor) => handleChange(content, delta, source, editor)}/>

    const [title, setTitle] = useState("");

    function handleChange(content, delta, source, editor) {
        setText(editor.getContents())
        //console.log(value)
    }

    function handleSave() {
        // console.log(quill.getContents())
        store.updateStoryChapter(title, text)
    }

    useEffect(() => {
        if(store.chapter !== null) {
            setTitle(store.chapter.name);
            setText(store.chapter.chapter)
        }
    }, [store.chapter])

    let editor = 
        <Grid container>
            <Grid item xs = {3} >
                <Button id="text_button" onClick = {() => navigate('/comic/' + store.work._id)}>back to {store.work.title}</Button>
            </Grid>
            <Grid item xs = {6} sx = {{display: 'flex', justifyContent:'center'}} >
                <TextField value={title} onChange = {(event) => {setTitle(event.target.value)}} sx = {{input: {color: 'white'}}}>  </TextField>
            </Grid>
            <Grid item xs = {3}/>

            <Grid item xs = {1}/>
            <Grid item xs = {10}>
                {div}
            </Grid>
            <Grid item xs = {1}/>
            
            <Grid item xs = {11}/>
            <Grid item xs = {1}>
                <Button variant="contained" sx={{ backgroundColor:'#9c4247', "&:hover":  { backgroundColor: '#b8434b' } }} onClick = {handleSave}>Save</Button>
            </Grid>
        </Grid>

    return (
        editor
    )
}