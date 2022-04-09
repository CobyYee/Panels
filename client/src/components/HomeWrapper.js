import {Box, Typography, Grid} from '@mui/material'

function HomeWrapper() {

    return (
        <Grid container sx = {{ flexDirection: 'column' }}>
            <Grid item xs = {12} sx={{ height: '100vh' }}>
                <Grid xs={12} sx={{ height: '50vh' }}>
                <Box id = "featured-works" sx = {{position: 'relative', backgroundColor: 'red',  width: '80%', left: '10%', height: '25%', top: '10%', borderRadius: '15px'}}>

                </Box>
                </Grid>
                <Grid xs={12} sx={{ height: '50vh' }}>
                <Box id = "featured-works" sx = {{backgroundColor: 'white',  width: '80%', left: '10%', height: '25%', top: '10%', borderRadius: '15px'}}>
                </Box>
                </Grid>
            </Grid>
        </Grid>
    )

}

export default HomeWrapper;