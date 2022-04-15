import { Box, TextField, Menu, MenuItem, IconButton, Avatar, AppBar, Toolbar, Button, Grid } from '@mui/material';
import React from 'react';
import { useNavigate } from "react-router-dom";
import ContentContext from '../content'
import AuthContextProvider from '../auth'
import { useContext, useState } from 'react';
import GlobalStoreContext from '../store';

export default function Banner() {
    const {content} = useContext(ContentContext)
    const {auth} = useContext(AuthContextProvider)
    const {store} = useContext(GlobalStoreContext)
    let navigate = useNavigate();
    
    // START CREATING COMPONENTS FOR HANDLING THE CONTENT CHANGER
    let changeContent = (contentType) => {
        content.setContentType(contentType)
    }
    
    let storyBgColor = '#4E4E4E'
    let comicBgColor = '#4E4E4E'
    if(content.contentType === "Story")
        storyBgColor = '#B8434B'
    else 
        comicBgColor = '#B8434B'

    let contentButton = <div id = "content-selector"> 
        <Box sx = {{width: '50%', backgroundColor: comicBgColor, borderRadius: '15px'}}>
            <div id = "comic-selector" onClick={() => changeContent("Comic")}>
                Comic
            </div>
        </Box>
        <Box sx = {{width: '50%', backgroundColor: storyBgColor, borderRadius: '15px'}}>
            <div id = "story-selector" onClick={() => changeContent("Story")}>
                Story
            </div>
        </Box>
    </div> 
    // FINISH CREATING COMPONENTS FOR HANDLING THE CONTENT CHANGER

    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    const handleLogout = () => {
        handleClose(); //not sure if necessary
        auth.logoutUser();
    }

    const handleProfile = () => {
        auth.loadProfile(auth.session._id);
        store.loadProfileStories(auth.session._id);
    }

    const handleListScreen = () => {
        handleClose(); //not sure if necessary
        store.listScreen();
        navigate("/listscreen/")
    }

    let options =
        <div>
            <MenuItem onClick={() => navigate('/login/')}>
                Login
            </MenuItem>
            <MenuItem onClick={() => navigate('/register/')}>
                Create New Account
            </MenuItem>
            <MenuItem>
                Continue as Guest
            </MenuItem>
        </div>

    if (auth.session !== null) {
        options =
        <div>
            <MenuItem onClick={handleProfile}>
                Profile
            </MenuItem>
            <MenuItem onClick={() => navigate('/bookmarks/')}>
                Bookmarks
            </MenuItem>
            <MenuItem onClick={() => navigate('/settings/')}>
                Settings
            </MenuItem>
            <MenuItem onClick={handleLogout}>
                Logout
            </MenuItem>
        </div>
    }
    
    let menu = <Menu
                    anchorEl={anchorEl}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    keepMounted
                    id="primary-search-account-menu"
                    open={open}
                    onClose={handleClose}
                    onClick={handleClose}
                >
                    { options }
                </Menu>

    return (
        <Box sx = {{ flexGrow: 1}}>
            <AppBar position="static" style={{ background: '#3d3d3d' }}>
                <Toolbar>
                    <Grid item={true} xs={12} container sx={{ width: '100%' }}>
                        <Grid item xs={1} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Button 
                                onClick={() => navigate("/")}  
                                disableRipple
                                sx={{ color: '#9c4247', fontSize: 32, fontFamily: 'Poppins', "&.MuiButtonBase-root:hover": { bgcolor: "transparent" } }}>
                                    PANELS 
                            </Button>
                        </Grid>
                        <Grid item xs={1} container sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <Button
                                onClick={handleListScreen} 
                                disableRipple
                                sx={{ color: 'white', fontSize: 15, "&.MuiButtonBase-root:hover": { bgcolor: "transparent" } }}>
                                    All Comics 
                            </Button>
                        </Grid>
                        <Grid item xs ={8} container sx={{display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <TextField 
                                placeholder = "Search comic or author" 
                                sx = {{
                                    width: '100%', 
                                    maxWidth: '50vw',
                                    bgcolor: '#4E4E4E', 
                                    border: 'none', 
                                    input: {color: 'white'} 
                                }}>
                            </TextField>
                        </Grid>
                        <Grid item xs = {1} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Box>
                            { contentButton }
                            </Box>
                        </Grid>
                        <Grid item xs = {1} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <IconButton
                                onClick={handleClick}
                                size="large"
                                edge="end"
                                aria-controls="primary-search-account-menu"
                                aria-haspopup="true"
                            >
                                <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
                            </IconButton>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            { menu }
        </Box>
    )
}