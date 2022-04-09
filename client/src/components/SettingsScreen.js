import { useState } from 'react'
import { Typography, Box, Grid, MenuList, MenuItem } from '@mui/material';

export default function SettingsScreen() {
    const [setting, setSetting] = useState("General")
    return (
        <Box sx={{ paddingTop: 10, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Grid item={true} xs={12} container sx={{ display: 'flex', justifyContent: 'center' }}>
                <Grid item xs={1} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <MenuList sx={{ width: "90%", display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
                        <MenuItem onClick={() => setSetting("General")} sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Typography color='white'>General</Typography>
                        </MenuItem>
                        <MenuItem onClick={() => setSetting("Account")} sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Typography color='white'>Account</Typography>
                        </MenuItem>
                        <MenuItem onClick={() => setSetting("Notifications")} sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Typography color='white'>Notificatons</Typography>
                        </MenuItem>
                        <MenuItem onClick={() => setSetting("Appearance")} sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Typography color='white'>Appearance</Typography>
                        </MenuItem>
                        <MenuItem onClick={() => setSetting("Privacy")} sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Typography color='white'>Privacy</Typography>
                        </MenuItem>
                        <MenuItem onClick={() => setSetting("Terms and Conditions")} sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Typography color='white'>Terms and Conditions</Typography>
                        </MenuItem>
                    </MenuList>
                </Grid>
                <Grid item xs={7}>
                    <Box sx={{ border: 1, borderColor: '#4e4e4e', height: '100%' }}>
                        <Typography color='white'>{setting}</Typography>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}