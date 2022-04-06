import { Grid, Typography, Box, TextField } from '@mui/material';

export default function Banner() {
    return (
        <Box sx = {{width: '100%', height: '7%', backgroundColor: '#3D3D3D'}}>
            <Grid container>
                <Grid item xs={1.3}>
                    <Typography id="logo"> PANELS </Typography>
                </Grid>
                <Grid item xs={1.3}>
                    <Typography id="popular"> POPULAR </Typography>                    
                </Grid>
                <Grid item xs={1.3}>
                    <Typography id="genres"> GENRES </Typography>                    
                </Grid>
                <Grid item xs={4}>
                    <TextField defaultValue = "Search comic or author" sx = {{width: '100%', top: '8%', bgcolor: '#4E4E4E', input: {color: 'white'}}}>
                         AIJSDOAIJD
                    </TextField>
                </Grid>
            </Grid>
        </Box>
    )
}