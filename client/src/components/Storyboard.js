import ContentContext from '../content'
import { useContext } from 'react'
import { Grid, Button, TextField, Box } from '@mui/material'
import { useNavigate } from "react-router-dom";

function StoryBoard() {
    const { content } = useContext(ContentContext)
    let navigate = useNavigate();

    let editor = ""
    if(content.contentType === "Comic") {
        editor = <Box sx={{ height: '80vh', position: 'relative', backgroundColor: 'white', borderRadius: '10px', width: '90%', left: '5%'}}> </Box>
    }
    else {
        editor = <Box sx={{ height: '80vh', position: 'relative', backgroundColor: 'black', borderRadius: '10px', width: '90%', left: '5%'}}> </Box>
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