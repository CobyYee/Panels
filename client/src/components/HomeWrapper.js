import {Box, Typography, Grid} from '@mui/material'

function HomeWrapper() {

    return (
        <Grid container sx = {{ flexDirection: 'column' }}>
            <Grid item xs = {12} sx={{ height: '100vh' }}>
                <Grid xs={12} sx={{ height: '25vh', justifyContent: 'center', display: 'flex' }}>
                    <Box sx = {{position: 'relative', backgroundColor: '#3d3d3d',  width: '85%', height: '100%', top: '8%', borderRadius: '15px'}}>

                    </Box>
                </Grid>
                <Grid xs={12} sx={{ height: '45vh', justifyContent: 'center', display: 'flex' }}>
                    <Typography sx = {{color: 'white', fontSize: '16pt'}}>
                        Latest Updates
                    </Typography>
                </Grid>
                <Grid xs={12} sx={{ height: '45vh' }}>
                    <Box xs={12} sx = {{position: 'relative', borderColor: 'white',  width: '85%', left: '10%', height: '25%', top: '10%', borderRadius: '15px'}}>

                    </Box>
                </Grid>
            </Grid>
        </Grid>
    )

}

export default HomeWrapper;