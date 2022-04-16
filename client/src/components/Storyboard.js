import { GlobalStoreContext }  from '../store';
import { useContext } from 'react'
import { Grid, Button, TextField, Box } from '@mui/material'
import { useNavigate } from "react-router-dom";
import exStory from '../testimgs/exStory.jpg';
import exComic from '../testimgs/exComic.jpg';

function StoryBoard() {
    const { store } = useContext(GlobalStoreContext)
    let navigate = useNavigate();

    let editor = ""
    if(store.mode === "comic") {
        editor = <Box sx={{ height: '80vh', position: 'relative', backgroundColor: 'white', borderRadius: '10px', width: '90%', left: '5%'}}>
            <img src={exComic} alt="Pic" style={{ width: '100%', height: '100%' }}/>
        </Box>
    }
    else {
        editor = <Box sx={{ height: '80vh', position: 'relative', backgroundColor: 'black', borderRadius: '10px', width: '90%', left: '5%'}}>
            <img src={exStory} style={{ width: '100%', height: '100%' }} alt="Pic"/>
        </Box>
    }

    let component = 
        <Grid container sx = {{ flexDirection: 'row'}}>
            <Grid item xs = {3} >
                <Button variant="text" onClick = {() => navigate('/profile/')} sx = {{color: 'white', fontSize: '28px'}}>Back to Profile</Button>
            </Grid>
            <Grid item xs = {6} sx = {{display: 'flex', justifyContent:'center'}} >
                <TextField placeholder = "Name" sx = {{input: {color: 'white'}}}>  </TextField>
            </Grid>
            <Grid item xs = {3}/>
            <Grid item xs = {12}>
                {editor}
            </Grid>
            <Grid item xs = {10}/>
            <Grid item xs = {1}>
                <Button variant="contained" sx={{ backgroundColor:'#9c4247', "&:hover":  { backgroundColor: 'red' } }} >Save</Button>
            </Grid>
            <Grid item xs = {1}>
                <Button variant="contained" sx={{ backgroundColor:'#9c4247', "&:hover": { backgroundColor: 'red' } }}>Publish</Button>
            </Grid>
        </Grid>


    return (
        component
    )
}

export default StoryBoard;