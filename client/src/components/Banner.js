import { Grid, Typography, Box, TextField } from '@mui/material';
import { useNavigate, useContext } from "react-router-dom";
import ContentContext from '../content'

export default function Banner() {
    //const {content} = useContext(ContentContext)

    let navigate = useNavigate();

    /*
    if(content.contentType == "Story") {

    }
    else {
        
    }*/

    return (
        <Box sx = {{width: '100%', height: '7%', backgroundColor: '#3D3D3D'}}>
            <Grid container>
                <Grid item xs={1.3}>
                    <Typography id="logo" onClick={() => navigate('/')}> PANELS </Typography>
                </Grid>
                <Grid item xs={1.3}>
                    <Typography id="popular" onClick={() => navigate('/listscreen/')}> POPULAR </Typography>                    
                </Grid>
                <Grid item xs={1.3}>
                    <div id="genres" onClick={() => navigate('/listscreen/')}> GENRES </div>                 
                </Grid>
                <Grid item xs={4}>
                    <TextField defaultValue = "Search comic or author" sx = {{width: '100%', top: '8%', bgcolor: '#4E4E4E', borderRadius: '13px', 
                        border: 'none', input: {color: 'white'}}}>
                    </TextField>
                </Grid>
                <Grid item xs={3}>

                </Grid>
                <Grid item xs={1}>
                    
                </Grid>
            </Grid>
        </Box>
    )
}