import { Grid, Typography, Box, TextField, Menu, MenuItem, IconButton, Avatar } from '@mui/material';
import React from 'react';
import { useNavigate } from "react-router-dom";
import ContentContext from '../content'
import { useContext, useState } from 'react';
import zIndex from '@mui/material/styles/zIndex';

export default function Banner() {
    const {content} = useContext(ContentContext)
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


    // START CREATING THE MENU ICON
    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }
    
    let icon = <IconButton
                    onClick={handleClick}
                    size="large"
                    sx={{ ml: 2 }}
                    aria-controls={open ? 'account-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                >
                    <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
                </IconButton>
    let menu = <Menu
                    anchorEl={anchorEl}
                    id="account-menu"
                    open={open}
                    onClose={handleClose}
                    onClick={handleClose}
                    PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                        },
                        '&:before': {
                        content: '""',
                        display: 'block',
                        position: 'absolute',
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: 'background.paper',
                        transform: 'translateY(-50%) rotate(45deg)',
                        zIndex: 0,
                        },
                    },
                    }}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                    <MenuItem onClick={() => navigate('/profilescreen/')}>
                        Profile
                    </MenuItem>
                    <MenuItem onClick={() => navigate('/bookmarks/')}>
                        Bookmarks
                    </MenuItem>
                    <MenuItem onClick={() => navigate('/settings/')}>
                        Settings
                    </MenuItem>
                    <MenuItem>
                        Login
                    </MenuItem>
                </Menu>
    let iconMenu = 
        <Box sx = {{position: 'absolute', width: '8%', left: '92%'}}>
            {icon}
            {menu}
        </Box>
    // FINISH CREATING THE MENU ICON


    // START RENDERING
    return (
        <Box sx = {{width: '100%', height: '7%', backgroundColor: '#3D3D3D'}}>
                    <Typography id="logo" onClick={() => navigate('/')}> PANELS </Typography>
                    <Typography id="popular" onClick={() => navigate('/listscreen/')}> POPULAR </Typography>
                    <div id="genres" onClick={() => navigate('/listscreen/')}> GENRES </div>
                    <TextField defaultValue = "Search comic or author" sx = {{position: 'absolute', width: '30%', bgcolor: '#4E4E4E', borderRadius: '13px', 
                        border: 'none', input: {color: 'white'}, left: '35%'}}>
                    </TextField>
                    { contentButton }   
                    {iconMenu}

        </Box>
    )
}