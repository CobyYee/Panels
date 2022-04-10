import ContentContext from '../content'
import { useContext } from 'react'
import { Grid, Button, TextField } from '@mui/material'
import { useNavigate } from "react-router-dom";

function StoryBoard() {
    const { content } = useContext(ContentContext)
    let navigate = useNavigate();

    let component = ""
    if(content.contentType === "Comic") {
        component = 
            <Grid container sx = {{ flexDirection: 'column', display: 'flex'}}>
                <Grid item xs = {3} sx = {{display: 'flex'}}>
                    <Button variant="text" onClick = {() => navigate('/profile/')} sx = {{color: 'white', fontSize: '28px', display: 'flex'}}>Back to Profile</Button>
                </Grid>
                <Grid item xs = {6} sx = {{display: 'flex'}}>
                    <TextField placeholder = "name">  </TextField>
                </Grid>
                <Grid item xs = {3}/>
                <Grid item xs = {12}>

                </Grid>
                <Grid item xs = {10}/>
                <Grid item xs = {1}>

                </Grid>
                <Grid item xs = {1}>

                </Grid>
            </Grid>
    }
    else {
        component = ""
    }


    return (
        component
    )
}

export default StoryBoard;