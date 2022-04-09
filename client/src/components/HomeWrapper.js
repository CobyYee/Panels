import {Box, Typography, Grid} from '@mui/material'

function HomeWrapper() {

    return (
        <Grid container sx = {{ flexDirection: 'column' }}>
            <Grid item xs = {9}>
                <Box id = "featured-works" sx = {{backgroundColor: '#3d3d3d',  width: '80%', left: '10%', height: '25%', top: '10%', borderRadius: '15px'}}>

                </Box>
            </Grid>
            <Grid item xs = {1}> 
            </Grid>
        </Grid>
    )

}

export default HomeWrapper;