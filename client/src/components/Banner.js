import { Typography, Box, TextField, Menu, MenuItem, IconButton, Avatar, AppBar, Toolbar } from '@mui/material';
import React from 'react';
import { useNavigate } from "react-router-dom";
import ContentContext from '../content'
import { useContext, useState } from 'react';

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
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
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
                >
                    <MenuItem onClick={() => navigate('/profile/')}>
                        Profile
                    </MenuItem>
                    <MenuItem onClick={() => navigate('/bookmarks/')}>
                        Bookmarks
                    </MenuItem>
                    <MenuItem onClick={() => navigate('/settings/')}>
                        Settings
                    </MenuItem>
                    <MenuItem onClick={() => navigate('/login/')}>
                        Login
                    </MenuItem>
                    <MenuItem onClick={() => navigate('/register/')}>
                        Register
                    </MenuItem>
                    <MenuItem>
                        Logout
                    </MenuItem>
                </Menu>
    let iconMenu = 
        <Box>
            {icon}
            {menu}
        </Box>
    // FINISH CREATING THE MENU ICON


    // START RENDERING
    return (
        <Box sx = {{ flexGrow: 1}}>
            <AppBar position="static" style={{ background: '#3d3d3d' }}>
                <Toolbar>
                    <Typography 
                        onClick={() => navigate('/')} 
                        variant="h4"
                        noWrap 
                        component="div" 
                        sx={{ display: { xs: 'none', sm: 'block' }, color: '#9c4247' }} 
                        pr={10}>
                            PANELS 
                    </Typography>
                    <Typography
                        onClick={() => navigate('/listscreen/')} 
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ display: { xs: 'none', sm: 'block' } }}
                        pr={5}> 
                            Popular 
                    </Typography>
                    <Typography
                        onClick={() => navigate('/listscreen/')}                        
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ display: { xs: 'none', sm: 'block' } }}
                        pr={20}                        
                    >
                        Genres
                    </Typography>
                    <TextField 
                        placeholder = "Search comic or author" 
                        sx = {{ 
                            flexGrow: .4,
                            width: '30%', 
                            bgcolor: '#4E4E4E', 
                            border: 'none', 
                            input: {color: 'white'} 
                        }}>
                    </TextField>
                    <Box sx={{ flexGrow: 1 }}>
                    { 
                        contentButton 
                    }
                    </Box>
                    { iconMenu }
                </Toolbar>
            </AppBar>
        </Box>
    )
}