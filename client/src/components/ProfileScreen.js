//import { useState } from 'react'
import { Typography, Box, Grid, Button, List, ListItem, Divider } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle'
import { useNavigate } from 'react-router-dom'
import { useContext, useEffect, useRef } from 'react'
import AuthContextProvider from '../auth'
import GlobalStoreContext from '../store';

export default function ProfileScreen() {
    //get user from url. if user is self, we can display the Drafts section and enable the createNew button. Otherwise, don't
    //current user and their works should be stored in store? so we can retrieve and filter and place in Box
    const firstRender = useRef(false);
    let navigate = useNavigate()
    const {auth} = useContext(AuthContextProvider)
    const {store} = useContext(GlobalStoreContext)

    useEffect(() => {
        console.log(firstRender)
        if (firstRender.current) {
            store.loadProfileWorks(auth.user._id);
        }
        firstRender.current = true;
    }, [store.mode]);

    function handleFollow(event) {
        let user = auth.user;
        user.follows.push(auth.session._id);
        auth.updateUser(user);
    }

    function handleUnfollow(event) {
        let user = auth.user;
        user.follows.splice(user.follows.indexOf(auth.session._id), 1)
        auth.updateUser(user);
    }

    function loadWork(cardId) {
        store.loadWork(cardId);
        console.log(cardId);
    }

    let drafts = ""
    let profileButtons = ""

    if (auth.session !== null && auth.session._id === auth.user._id) {
        drafts = 
        <div>
        <Grid item pt={2} pb={1} xs={12} sx={{ display: 'flex', verticalAlign: 'center' }}>
                        <Typography sx={{ color: 'white', fontSize: 25 }}>Drafts</Typography>
        </Grid>
        <Grid item xs={12} sx={{ border: 1, borderColor: '#4e4e4e' }}>
            <List sx={{ width: '100%', overflowY: 'scroll', maxHeight: '25vh' }}>
            {
                store.works.filter(work => work.published === null).map((work, index) => {
                    if (store.works.length - index > 1)
                        return (
                            <div key={ "draft" + index }>
                                <ListItem>
                                    <Box sx={{ borderRadius: 1, width: '100%', height: '32px', display: 'flex', alignItems: 'center' }}>
                                        <Box sx={{ flexGrow: 1 }}>
                                            <Button onClick = {() => navigate('/comic/')} sx={{ color: 'white', flexGrow: 1 }}>{ work.title }</Button>
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
                                    <Button onClick = {() => navigate('/comic/')} sx={{ color: 'white', flexGrow: 1 }}>{ work.title }</Button>
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
        </div>
        profileButtons =
            <Grid item xs={4} sx={{display: 'flex', justifyContent: 'flex-end'}}>
                <Button onClick = {() => navigate('/storyboard/')} sx={{ color: '#9c4247', "&:hover": { color: 'red' } }}>Create New</Button>
                <Button onClick = {() => navigate('/uploadcomic/')} sx={{ color: '#9c4247', "&:hover": { color: 'red' } }}>Upload New</Button>
            </Grid>
    }

    let profile_image = <AccountCircle sx={{ color: '#4e4e4e', position: 'relative', top: '15%', fontSize: 280 }}/>
    return (
        <Box sx={{ paddingTop: 10, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Grid item={true} xs={10} container sx={{ display: 'flex', justifyContent: 'center', minWidth: '1200px' }}>
                <Grid item xs={3} sx={{ alignItems: 'right' }}>
                    <Grid item xs={12} pb={6} sx={{ display: 'flex', justifyContent: 'center' }}>
                        { profile_image }
                    </Grid>
                    <Grid item xs={12} pb={2} sx={{ display: 'flex', justifyContent: 'center' }}>
                        {(auth.session._id !== auth.user._id) ? ((auth.user.follows.includes(auth.session._id) ? 
                        <Button variant="contained" onClick={handleUnfollow} sx={{ backgroundColor: '#9c4247', "&:hover": { backgroundColor: 'red' } }}>Unfollow User</Button> 
                        : 
                        <Button variant="contained" onClick={handleFollow} sx={{ backgroundColor: '#9c4247', "&:hover": { backgroundColor: 'red' } }}>Follow User</Button>)) : ""}
                    </Grid>
                </Grid>
                <Grid item xs={7}>
                    <Grid item pt={14} xs={12} sx={{ display: 'flex', verticalAlign: 'center' }}>
                        <Typography sx={{ color: 'white', fontSize: 40 }}>{(auth.user !== null) ? auth.user.username : ""}</Typography>
                    </Grid>
                    <Grid item xs={12} sx={{ display: 'flex', verticalAlign: 'center' }}>
                        <Typography sx={{ color: 'white', fontSize: 15 }}>{(auth.user !== null && auth.user.admin) ? "admin" : "user"}</Typography>
                    </Grid>
                    <Grid item pt={6} pb={1} xs={12} sx={{ display: 'flex', verticalAlign: 'center', maxHeight: '30vh' }}>
                        <Grid item xs={8}>
                            <Typography sx={{ color: 'white', fontSize: 25 }}>Uploaded Works</Typography>
                        </Grid>
                        { profileButtons }
                    </Grid>
                    <Grid item xs={12} sx={{ border: 1, borderColor: '#4e4e4e' }}>
                        <List sx={{ width: '100%', overflowY: 'scroll', maxHeight: '25vh' }}>
                        {
                            store.works.filter(work => work.published !== null).map((work, index) => {
                                if (store.works.length - index > 1)
                                return (
                                <div key={ "published" + index }>
                                    <ListItem>
                                        <Box sx={{ borderRadius: 1, width: '100%', height: '32px', display: 'flex', alignItems: 'center' }}>
                                            <Box sx={{ flexGrow: .99 }}>
                                                <Button onClick = {() => loadWork(work._id)} sx={{ color: 'white', flexGrow: 1 }}>{ work.title }</Button>
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
                                                <Button onClick = {() => navigate('/comic/')} sx={{ color: 'white', flexGrow: 1 }}>{ work.title }</Button>
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
                    { drafts }
                </Grid>
            </Grid>
        </Box>
    )
}