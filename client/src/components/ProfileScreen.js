import { Typography, Box, Container, Grid } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle'

export default function ProfileScreen() {

    let profile_image = <AccountCircle sx={{ color: 'white', position: 'relative', left: '10%', top: '10%', fontSize: 200 }}/>
    return (
        <Box sx={{ background: '#2b2b2b', height: '95.1vh' }}>
          <Box sx={{ paddingTop: 10, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Grid item={true} xs={10} container spacing={2}>
              <Grid item xs={4}>
                { profile_image }
              </Grid>
              <Grid item xs={6}>
                right
              </Grid>
            </Grid>
          </Box>
        </Box>
    )
}