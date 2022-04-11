import { useState } from 'react'
import { Typography, Box, Grid, MenuList, MenuItem, TextField, Divider, List, ListItem, Button } from '@mui/material';

export default function SettingsScreen() {
    const [setting, setSetting] = useState(0)
    //let settingsArray=["Reset settings", "Change Account Password", "Enable notifications for Updates", "a", "b", "c"]

    return (
        <Box sx={{ paddingTop: 10, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Grid item={true} xs={12} container sx={{ display: 'flex', justifyContent: 'center' }}>
                <Grid item xs={1} sx={{ display: 'flex', justifyContent: 'center', width: '210px' }}>
                    <MenuList sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
                        <MenuItem onClick={() => setSetting(0)} sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Typography color='white'>General</Typography>
                        </MenuItem>
                        <MenuItem onClick={() => setSetting(1)} sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Typography color='white'>Account</Typography>
                        </MenuItem>
                        <MenuItem onClick={() => setSetting(2)} sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Typography color='white'>Notificatons</Typography>
                        </MenuItem>
                        <MenuItem onClick={() => setSetting(3)} sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Typography color='white'>Appearance</Typography>
                        </MenuItem>
                        <MenuItem onClick={() => setSetting(4)} sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Typography color='white'>Privacy</Typography>
                        </MenuItem>
                        <MenuItem onClick={() => setSetting(5)} sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Typography color='white'>Terms & Conditions</Typography>
                        </MenuItem>
                    </MenuList>
                </Grid>
                <Grid item xs={7}>
                    <Box sx={{ border: 1, borderColor: '#4e4e4e', height: '100%' }}>
                        <List sx={{ width: '100%' }}>
                            <ListItem>
                                <TextField fullWidth placeholder="Search... " sx={{ backgroundColor: '#4e4e4e', input: {color: 'white'} }}/>
                            </ListItem>
                            <Divider sx={{ backgroundColor: '#4e4e4e' }}/>
                            <ListItem>
                                <Button sx={{ color: 'white' }}>Reset Account Settings</Button>
                            </ListItem>
                            <Divider sx={{ backgroundColor: '#4e4e4e' }}/>
                            <ListItem>
                                <Button sx={{ color: 'white' }}>Enable Email Notifications for Updates</Button>
                            </ListItem>
                            <Divider sx={{ backgroundColor: '#4e4e4e' }}/>
                            <ListItem>
                                <Button sx={{ color: 'white' }}>Update Password</Button>
                            </ListItem>
                            <Divider sx={{ backgroundColor: '#4e4e4e' }}/>
                            <ListItem>
                                <Button sx={{ color: 'white' }}>Update Email</Button>
                            </ListItem>
                        </List>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}