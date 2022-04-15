//import { useState } from 'react'
import { Typography, Box, Grid, Button, List, ListItem, Divider } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import AuthContextProvider from '../auth'

export default function ProfileScreen() {
    //get user from url. if user is self, we can display the Drafts section and enable the createNew button. Otherwise, don't
    //current user and their works should be stored in store? so we can retrieve and filter and place in Box
    let navigate = useNavigate()
    const {auth} = useContext(AuthContextProvider)

    let works = [["Work 1", "1"], ["Work 2", "21"], ["Work 3", "14"], ["Work 4", "1123"], ["Work 5", "41"], ["Work 6", "11"], ["Work 7", "12"], ["Work 8", "1"], 
        ["Work 9", "1"], ["Work 10", "1"], ["Work 11", "1"], ["Work 12", "1"], ["Work 13", "1"], ["Work 14", "1"], ["Work 15", "1"], ["Work 16", "1"], ["Work 17", "1"], 
        ["Work 18", "1"], ["Work 19", "1"], ["Work 21", "1"], ["Work 21", "1"], ["Work 22", "1"], ["Work 23", "1"], ["Work 24", "1"], ["Work 24", "1"], ["Work 26", "1"], 
        ["Work 27", "1"], ["Work 28", "1"]]

    let publishedWork =
        <ListItem>
            <Box sx={{ borderRadius: 1, width: '100%', height: '32px', display: 'flex', alignItems: 'center' }}>
                <Box sx={{ flexGrow: 1 }}>
                    <Button onClick = {() => navigate('/comic/')} sx={{ color: 'white', flexGrow: 1 }}>Work 1</Button>
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
            <Grid item={true} xs={10} container sx={{ display: 'flex', justifyContent: 'center', minWidth: '1200px' }}>
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
                        <Typography sx={{ color: 'white', fontSize: 40 }}>{auth.user.username}</Typography>
                    </Grid>
                    <Grid item xs={12} sx={{ display: 'flex', verticalAlign: 'center' }}>
                        <Typography sx={{ color: 'white', fontSize: 15 }}>{(auth.user.admin) ? "admin" : "user"}</Typography>
                    </Grid>
                    <Grid item pt={6} pb={1} xs={12} sx={{ display: 'flex', verticalAlign: 'center', maxHeight: '30vh' }}>
                        <Grid item xs={8}>
                            <Typography sx={{ color: 'white', fontSize: 25 }}>Uploaded Works</Typography>
                        </Grid>
                        <Grid item xs={4} sx={{display: 'flex', justifyContent: 'flex-end'}}>
                            <Button onClick = {() => navigate('/storyboard/')} sx={{ color: '#9c4247', "&:hover": { color: 'red' } }}>Create New</Button>
                            <Button onClick = {() => navigate('/uploadcomic/')} sx={{ color: '#9c4247', "&:hover": { color: 'red' } }}>Upload New</Button>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sx={{ border: 1, borderColor: '#4e4e4e' }}>
                        <List sx={{ width: '100%', overflowY: 'scroll', maxHeight: '25vh' }}>
                        {
                            works.map((work, index) => {
                                if (works.length - index > 1)
                                return (
                                <div key={ "published" + index }>
                                    <ListItem>
                                        <Box sx={{ borderRadius: 1, width: '100%', height: '32px', display: 'flex', alignItems: 'center' }}>
                                            <Box sx={{ flexGrow: .99 }}>
                                                <Button onClick = {() => navigate('/comic/')} sx={{ color: 'white', flexGrow: 1 }}>{ work[0] }</Button>
                                            </Box>
                                            <Box sx={{ flexGrow: .01 }}>
                                                <Button onClick = {() => navigate('/uploadchapter/')} sx={{ color: '#9c4247' }}>Add Chapter</Button>
                                            </Box>
                                            <Button sx={{ color: '#9c4247' }}>Delete</Button>
                                        </Box>
                                    </ListItem>
                                    <Divider sx={{ backgroundColor: '#4e4e4e' }}/>
                                </div> )
                                return (
                                    <ListItem key={ "published" + index }>
                                        <Box sx={{ borderRadius: 1, width: '100%', height: '32px', display: 'flex', alignItems: 'center' }}>
                                        <Box sx={{ flexGrow: .99 }}>
                                                <Button onClick = {() => navigate('/comic/')} sx={{ color: 'white', flexGrow: 1 }}>{ work[0] }</Button>
                                            </Box>
                                            <Box sx={{ flexGrow: .01 }}>
                                                <Button onClick = {() => navigate('/uploadchapter/')} sx={{ color: '#9c4247' }}>Add Chapter</Button>
                                            </Box>
                                            <Button sx={{ color: '#9c4247' }}>Delete</Button>
                                        </Box>
                                    </ListItem>
                                )
                            })
                        }
                        </List>
                    </Grid>
                    <Grid item pt={2} pb={1} xs={12} sx={{ display: 'flex', verticalAlign: 'center' }}>
                        <Typography sx={{ color: 'white', fontSize: 25 }}>Drafts</Typography>
                    </Grid>
                    <Grid item xs={12} sx={{ border: 1, borderColor: '#4e4e4e' }}>
                    <List sx={{ width: '100%', overflowY: 'scroll', maxHeight: '25vh' }}>
                        {
                            works.map((work, index) => {
                                if (works.length - index > 1)
                                return (
                                <div key={ "draft" + index }>
                                    <ListItem>
                                        <Box sx={{ borderRadius: 1, width: '100%', height: '32px', display: 'flex', alignItems: 'center' }}>
                                            <Box sx={{ flexGrow: 1 }}>
                                                <Button onClick = {() => navigate('/comic/')} sx={{ color: 'white', flexGrow: 1 }}>{ work[0] }</Button>
                                            </Box>
                                            <Button sx={{ color: '#9c4247' }}>Publish</Button>
                                            <Button onClick = {() => navigate('/editcomic/')} sx={{ color: '#9c4247' }}>Edit</Button>
                                            <Button sx={{ color: '#9c4247' }}>Delete</Button>
                                        </Box>
                                    </ListItem>
                                    <Divider sx={{ backgroundColor: '#4e4e4e' }}/>
                                </div> )
                                return (
                                    <ListItem key={ "draft" + index }>
                                        <Box sx={{ borderRadius: 1, width: '100%', height: '32px', display: 'flex', alignItems: 'center' }}>
                                            <Box sx={{ flexGrow: 1 }}>
                                                <Button onClick = {() => navigate('/comic/')} sx={{ color: 'white', flexGrow: 1 }}>{ work[0] }</Button>
                                            </Box>
                                            <Button sx={{ color: '#9c4247' }}>Publish</Button>
                                            <Button onClick = {() => navigate('/editcomic/')} sx={{ color: '#9c4247' }}>Edit</Button>
                                            <Button sx={{ color: '#9c4247' }}>Delete</Button>
                                        </Box>
                                    </ListItem>
                                )
                            })
                        }
                        </List>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    )
}