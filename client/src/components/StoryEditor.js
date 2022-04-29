import Quill from 'quill'
import 'react-quill/dist/quill.snow.css';
import { useEffect } from 'react'
import { Button, Grid, TextField } from '@mui/material'
import { useNavigate } from 'react-router-dom'

export default function StoryEditor() {

    let quill;
    let navigate = useNavigate();

    function handleSave() {
        console.log(quill.getContents())
    }

    useEffect(() => {
        var Delta = Quill.import('delta')
        quill = new Quill('#story-editor', {
            formats: {
                'background': 'white'
            },
            modules: {
                toolbar: false
            },
            placeholder: 'Begin creating your story',
            theme: 'snow'
        })
        var change = new Delta()
        /*
        quill.on('text-change', function(delta) {
            console.log(delta);
        })
        */
    }, [])

    let editor = 
        <Grid container>
            <Grid item xs = {3} >
                <Button variant="text" onClick = {() => navigate('/profile/')} sx = {{color: 'white', fontSize: '28px'}}>Back to Profile</Button>
            </Grid>
            <Grid item xs = {6} sx = {{display: 'flex', justifyContent:'center'}} >
                <TextField placeholder = "Name" sx = {{input: {color: 'white'}}}>  </TextField>
            </Grid>
            <Grid item xs = {3}/>

            <Grid item xs = "1"/>
            <Grid item xs = "10"/>
                <div id = "story-editor"/>
            <Grid item xs = "1"/>
            
            <Grid item xs = "10"/>
            <Grid item xs = "1">
                <Button variant="contained" sx={{ backgroundColor:'#9c4247', "&:hover":  { backgroundColor: 'red' } }} onClick = {handleSave}>Save</Button>
            </Grid>
            <Grid item xs = "1">
                <Button variant="contained" sx={{ backgroundColor:'#9c4247', "&:hover": { backgroundColor: 'red' } }}>Publish</Button>
            </Grid>
        </Grid>

    return (
        editor
    )
}