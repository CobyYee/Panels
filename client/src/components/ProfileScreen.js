//import { useState } from 'react'
import { Typography, Box, Grid, Button, List, ListItem, Divider } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle'
import { useNavigate } from 'react-router-dom'

export default function ProfileScreen() {
    //get user from url. if user is self, we can display the Drafts section and enable the createNew button. Otherwise, don't
    //current user and their works should be stored in store? so we can retrieve and filter and place in Box
    let navigate = useNavigate()

    let publishedWork =
        <ListItem>
            <Box sx={{ borderRadius: 1, width: '100%', height: '32px', display: 'flex', alignItems: 'center' }}>
                <Box sx={{ flexGrow: 1 }}>
                    <Button sx={{ color: '#9c4247', flexGrow: 1 }}>Work 1</Button>
                </Box>
                <Button sx={{ color: '#9c4247' }}>Delete</Button>
            </Box>
        </ListItem>

    let draft =
        <ListItem>
            <Box sx={{ borderRadius: 1, width: '100%', height: '32px', display: 'flex', alignItems: 'center' }}>
                <Box sx={{ flexGrow: 1 }}>
                    <Button sx={{ color: '#9c4247', flexGrow: 1 }}>Work 1</Button>
                </Box>
                <Button sx={{ color: '#9c4247' }}>Publish</Button>
                <Button onClick = {() => navigate('/editcomic/')} sx={{ color: '#9c4247' }}>Edit</Button>
                <Button sx={{ color: '#9c4247' }}>Delete</Button>
            </Box>
        </ListItem>

    let profile_image = <AccountCircle sx={{ color: '#4e4e4e', position: 'relative', top: '15%', fontSize: 280 }}/>
    return (
        <Box sx={{ paddingTop: 10, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Grid item={true} xs={10} container sx={{ display: 'flex', justifyContent: 'center' }}>
                <Grid item xs={3} sx={{ alignItems: 'right' }}>
                    <Grid item xs={12} pb={6} sx={{ display: 'flex', justifyContent: 'center' }}>
                        { profile_image }
                    </Grid>
                    <Grid item xs={12} pb={2} sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Button variant="contained" sx={{ backgroundColor: '#9c4247', "&:hover": { backgroundColor: 'red' } }}>Follow User</Button>
                    </Grid>
                    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Button variant="contained" sx={{ backgroundColor: '#9c4247', "&:hover": { backgroundColor: 'red' } }}>Message User</Button>
                    </Grid>
                </Grid>
                <Grid item xs={7}>
                    <Grid item pt={14} xs={12} sx={{ display: 'flex', verticalAlign: 'center' }}>
                        <Typography sx={{ color: 'white', fontSize: 40 }}>Username</Typography>
                    </Grid>
                    <Grid item xs={12} sx={{ display: 'flex', verticalAlign: 'center' }}>
                        <Typography sx={{ color: 'white', fontSize: 15 }}>admin</Typography>
                    </Grid>
                    <Grid item pt={6} pb={1} xs={12} sx={{ display: 'flex', verticalAlign: 'center', maxHeight: '30vh' }}>
                        <Grid item xs={10}>
                            <Typography sx={{ color: 'white', fontSize: 25 }}>Uploaded Works</Typography>
                        </Grid>
                        <Grid item xs={2} sx={{display: 'flex', justifyContent: 'flex-end'}}>
                            <Button onClick = {() => navigate('/storyboard/')} sx={{ color: '#9c4247', "&:hover": { color: 'red' } }}>Create New</Button>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sx={{ border: 1, borderColor: '#4e4e4e' }}>
                        <List sx={{ width: '100%', overflowY: 'scroll', maxHeight: '25vh' }}>
                            { publishedWork }
                            <Divider light sx={{ backgroundColor: '#4e4e4e' }}/>
                            { publishedWork }
                            <Divider light sx={{ backgroundColor: '#4e4e4e' }}/>
                            { publishedWork }
                            <Divider light sx={{ backgroundColor: '#4e4e4e' }}/>
                            { publishedWork }
                            <Divider light sx={{ backgroundColor: '#4e4e4e' }}/>
                            { publishedWork }
                            <Divider light sx={{ backgroundColor: '#4e4e4e' }}/>
                            { publishedWork }
                            <Divider light sx={{ backgroundColor: '#4e4e4e' }}/>
                            { publishedWork }
                            <Divider light sx={{ backgroundColor: '#4e4e4e' }}/>
                            { publishedWork }
                            <Divider light sx={{ backgroundColor: '#4e4e4e' }}/>
                            { publishedWork }
                            <Divider light sx={{ backgroundColor: '#4e4e4e' }}/>
                            { publishedWork }
                        </List>
                    </Grid>
                    <Grid item pt={2} pb={1} xs={12} sx={{ display: 'flex', verticalAlign: 'center' }}>
                        <Typography sx={{ color: 'white', fontSize: 25 }}>Drafts</Typography>
                    </Grid>
                    <Grid item xs={12} sx={{ border: 1, borderColor: '#4e4e4e' }}>
                        <List sx={{ width: '100%', overflowY: 'scroll', maxHeight: '25vh' }}>
                            { draft }
                            <Divider light sx={{ backgroundColor: '#4e4e4e' }}/>
                            { draft }
                            <Divider light sx={{ backgroundColor: '#4e4e4e' }}/>
                            { draft }
                            <Divider light sx={{ backgroundColor: '#4e4e4e' }}/>
                            { draft }
                            <Divider light sx={{ backgroundColor: '#4e4e4e' }}/>
                            { draft }
                            <Divider light sx={{ backgroundColor: '#4e4e4e' }}/>
                            { draft }
                            <Divider light sx={{ backgroundColor: '#4e4e4e' }}/>
                            { draft }
                            <Divider light sx={{ backgroundColor: '#4e4e4e' }}/>
                            { draft }
                            <Divider light sx={{ backgroundColor: '#4e4e4e' }}/>
                            { draft }
                        </List>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    )
}