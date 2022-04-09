//import { useState } from 'react'
import { Typography, Box, Container, Grid, Button } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle'

export default function ProfileScreen() {
    //get user from url. if user is self, we can display the Drafts section and enable the createNew button. Otherwise, don't
    //current user and their works should be stored in store? so we can retrieve and filter and place in Box

    let profile_image = <AccountCircle sx={{ color: '#4e4e4e', position: 'relative', top: '15%', fontSize: 280 }}/>
    return (
        <Box sx={{ paddingTop: 10, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Grid item={true} xs={10} container sx={{ display: 'flex', justifyContent: 'center' }}>
                <Grid item xs={3} sx={{ alignItems: 'right' }}>
                    <Grid item xs={12} pb={6} sx={{ display: 'flex', justifyContent: 'center' }}>
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
                        <Box sx={{ border: 1, borderColor: '#4e4e4e', width: '100%', height: 350, maxHeight: '30vh' }}></Box>
                    </Grid>
                    <Grid item pt={2} xs={12} sx={{ display: 'flex', verticalAlign: 'center' }}>
                        <Typography sx={{ color: 'white', fontSize: 25 }}>Drafts</Typography>
                    </Grid>
                    <Grid item pt={1} xs={12} sx={{ display: 'flex', verticalAlign: 'center' }}>
                        <Box sx={{ border: 1, borderColor: '#4e4e4e', width: '100%', height: 350, maxHeight: '30vh' }}></Box>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    )
}