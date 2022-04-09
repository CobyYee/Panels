import { Typography, Box, Container, Grid, Button } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle'

export default function ProfileScreen() {

    let profile_image = <AccountCircle sx={{ color: 'white', position: 'relative', top: '10%', fontSize: 280 }}/>
    return (
        <Box sx={{ background: '#2b2b2b', height: '95.1vh' }}>
          <Box sx={{ paddingTop: 10, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Grid item={true} xs={10} container sx={{ display: 'flex', justifyContent: 'center' }}>
              <Grid item xs={3} sx={{ alignItems: 'right' }}>
                <Grid item xs={12} pb={5} sx={{ display: 'flex', justifyContent: 'center' }}>
                  { profile_image }
                </Grid>
                <Grid item xs={12} pb={2} sx={{ display: 'flex', justifyContent: 'center' }}>
                  <Button variant="contained" sx={{ backgroundColor:'#9c4247', "&:hover": { backgroundColor: 'red' } }}>Follow User</Button>
                </Grid>
                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                  <Button variant="contained" sx={{ backgroundColor:'#9c4247', "&:hover": { backgroundColor: 'red' } }}>Message User</Button>
                </Grid>
              </Grid>
              <Grid item xs={7}>
                <Grid item pt={14} xs={12} sx={{ display: 'flex', verticalAlign: 'center' }}>
                  <Typography sx={{ color: 'white', fontSize: 40 }}>Username</Typography>
                </Grid>
                <Grid item xs={12} sx={{ display: 'flex', verticalAlign: 'center' }}>
                  <Typography sx={{ color: 'white', fontSize: 15 }}>admin</Typography>
                </Grid>
                <Grid item pt={6} xs={12} sx={{ display: 'flex', verticalAlign: 'center' }}>
                  <Typography sx={{ color: 'white', fontSize: 25 }}>Uploaded Works</Typography>
                </Grid>
                <Grid item pt={1} xs={12} sx={{ display: 'flex', verticalAlign: 'center' }}>
                  <Box sx={{ border: 1, width: '100%', height: 350, maxHeight: '30vh' }}></Box>
                </Grid>
                <Grid item pt={2} xs={12} sx={{ display: 'flex', verticalAlign: 'center' }}>
                  <Typography sx={{ color: 'white', fontSize: 25 }}>Drafts</Typography>
                </Grid>
                <Grid item pt={1} xs={12} sx={{ display: 'flex', verticalAlign: 'center' }}>
                  <Box sx={{ border: 1, width: '100%', height: 350, maxHeight: '30vh' }}></Box>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Box>
    )
}