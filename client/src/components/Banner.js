import { Grid, Typography, Box, TextField, AppBar, IconButton, Menu, MenuItem, Toolbar } from '@mui/material';
//import AccountCircle from '@mui/icons-material';
import { useState } from 'react'
import { Link } from "react-router-dom";
//import ContentContext from '../content'

export default function Banner() {
    //const {content} = useContext(ContentContext)

    const [anchorEl, setAnchorEl] = useState(null);
    const isMenuOpen = Boolean(anchorEl);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    }

    const handleLogout = () => {
        handleMenuClose();
    }

    /*
    if(content.contentType == "Story") {

    }
    else {
        
    }*/

    const menu = 
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={'primary-search-account-menu'}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}><Link to='/login/'>Login</Link></MenuItem>
            <MenuItem onClick={handleMenuClose}><Link to='/register/'>Create New Account</Link></MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>

    /*
    return (
        <Box sx = {{width: '100%', height: '7%', backgroundColor: '#3D3D3D'}}>
            <Grid container>
                <Grid item xs={1.3}>
                    <Typography id="logo" onClick={() => navigate('/')}> PANELS </Typography>
                </Grid>
                <Grid item xs={1.3}>
                    <Typography id="popular" onClick={() => navigate('/listscreen/')}> POPULAR </Typography>                    
                </Grid>
                <Grid item xs={1.3}>
                    <div id="genres" onClick={() => navigate('/listscreen/')}> GENRES </div>                 
                </Grid>
                <Grid item xs={4}>
                    <TextField defaultValue = "Search comic or author" sx = {{width: '100%', top: '8%', bgcolor: '#4E4E4E', borderRadius: '13px', 
                        border: 'none', input: {color: 'white'}}}>
                    </TextField>
                </Grid>
                <Grid item xs={3}>

                </Grid>
                <Grid item xs={1}>
                    
                </Grid>
            </Grid>
        </Box>
    )
    */

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" style={{ background: '#3d3d3d' }}>
                <Toolbar>
                    <Typography                        
                        variant="h4"
                        noWrap
                        component="div"
                        sx={{ display: { xs: 'none', sm: 'block' } }}
                        pr={5}                        
                    >
                        <Link style={{ textDecoration: 'none', color: '#9c4247' }} to='/'>Panels</Link>
                    </Typography>
                    <Typography                        
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ display: { xs: 'none', sm: 'block' } }}
                        pr={4}                        
                    >
                        <Link style={{ textDecoration: 'none', color: '#FFFFFF' }} to='/popular'>Popular</Link>
                    </Typography>
                    <Typography                        
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ display: { xs: 'none', sm: 'block' } }}
                        pr={5}                        
                    >
                        <Link style={{ textDecoration: 'none', color: '#FFFFFF' }} to='/genres'>Genres</Link>
                    </Typography>
                    <TextField placeholder="Search for a comic or author" variant="filled" multiline maxRows={4} InputProps={{ style: { width: 2000, height: 40, paddingBottom: 20, color: 'white', backgroundColor: '#4e4e4e' } }}/>
                    <Box sx= {{ flexGrow: 1 }}/>
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }} justifyContent="flex-end">
                        <IconButton
                            size="large"
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={'primary-search-account-menu'}
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            color="inherit"
                            style={{ borderStyle: 'solid', borderWidth: '.1px', borderColor: 'black' }}
                        >
                            { "Bu" }
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            {
                menu
            }
        </Box>
    );
}