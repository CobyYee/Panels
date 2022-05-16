import { Box, TextField, Menu, MenuItem, IconButton, Avatar, AppBar, Toolbar, Button, Grid } from '@mui/material';
import React from 'react';
import { useNavigate } from "react-router-dom";
import AuthContextProvider from '../auth'
import { useContext, useState } from 'react';
import GlobalStoreContext from '../store';
import AccountCircle from '@mui/icons-material/AccountCircle';

export default function Banner() {
    const {auth} = useContext(AuthContextProvider)
    const {store} = useContext(GlobalStoreContext)
    let navigate = useNavigate();

    const [searchStatus, setSearchStatus] = useState("")

    const handleSearchChange = (event) => {
        setSearchStatus(event.target.value);
    }

    const searchWorks = (event) => {
        if (event.key === 'Enter') {
            store.search(searchStatus);
            navigate("/listscreen/");
        }
    }
    
    let changeContent = () => {
        store.switchMode();
        setSearchStatus("");
    }
    
    let storyBgColor = '#4E4E4E'
    let comicBgColor = '#4E4E4E'
    if(store.mode === "story")
        storyBgColor = '#B8434B'
    else 
        comicBgColor = '#B8434B'         

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
        navigate("/")
    }

    const handleProfile = () => {
        auth.loadProfile(auth.session._id);
        store.loadProfileWorks(auth.session._id);
    }

    const handleBookmarks = () => {
        if (store.mode === "comic") {
            store.loadBookmarks(auth.session.comic_bookmarks);
        }
        else {
            store.loadBookmarks(auth.session.story_bookmarks);
        }
        navigate("/bookmarks/");
    }

    const handleListScreen = () => {
        handleClose(); //not sure if necessary
        store.listScreen();
        navigate("/listscreen/");
    }

    let options =
        <div>
            <MenuItem onClick={() => navigate('/login/')}>
                Login
            </MenuItem>
            <MenuItem onClick={() => navigate('/register/')}>
                Create New Account
            </MenuItem>
        </div>

    let profile = <AccountCircle sx={{ width: 32, height: 32, color: 'white' }} />

    if (auth.session !== null) {
        options =
        <div>
            <MenuItem onClick={handleProfile}>
                Profile
            </MenuItem>
            <MenuItem onClick={handleBookmarks}>
                Bookmarks
            </MenuItem>
            <MenuItem onClick={() => navigate('/settings/')}>
                Settings
            </MenuItem>
            <MenuItem onClick={handleLogout}>
                Logout
            </MenuItem>
        </div>
        profile = <Avatar sx={{ width: 32, height: 32 }}>{auth.session.username.charAt(0)}</Avatar>
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
                                { (store.mode === "comic" ? "All Comics" : "All Stories") }
                            </Button>
                        </Grid>
                        <Grid item xs ={8} container sx={{display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <TextField 
                                placeholder = "Search comic" 
                                sx = {{
                                    width: '100%', 
                                    maxWidth: '50vw',
                                    bgcolor: '#4E4E4E', 
                                    border: 'none', 
                                    input: {color: 'white'} 
                                }}
                                value={searchStatus}
                                onChange={handleSearchChange}
                                onKeyDown={searchWorks}>
                            </TextField>
                        </Grid>
                        <Grid item xs={1} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <div id="content-selector"> 
                                <div style={{ width: '50%', backgroundColor: comicBgColor, borderRadius: '15px' }}>
                                    <div id = "comic-selector" onClick={() => changeContent("Comic")}>Comic</div>
                                </div>
                                <div style={{ width: '50%', backgroundColor: storyBgColor, borderRadius: '15px' }}>
                                    <div id = "story-selector" onClick={() => changeContent("Story")}>Story</div>
                                </div>
                            </div>
                        </Grid>
                        <Grid item xs = {1} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <IconButton
                                onClick={handleClick}
                                size="large"
                                edge="end"
                                aria-controls="primary-search-account-menu"
                                aria-haspopup="true"
                            >
                                { profile }
                            </IconButton>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            { menu }
        </Box>
    )
}