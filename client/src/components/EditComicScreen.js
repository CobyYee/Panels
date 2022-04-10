import { useState } from 'react'
import { Typography, Box, Grid, Button, List, ListItem } from '@mui/material';

export default function EditComicScreen() {
    const [currentPage, setCurrentPage] = useState(1)

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <Grid item={true} xs={12} container sx={{ display: 'flex', justifyContent: 'center' }}>
                <Grid item xs={3} sx={{ display: 'flex', justifyContent: 'center', height: '92vh', overflowY: 'scroll' }}>
                    <Box sx={{ height: '100%', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <List sx={{ height: '100%', width: '100%' }}>
                            <ListItem sx={{display: 'flex', justifyContent: 'center' }} onClick={() => setCurrentPage(1)}>
                                <Typography pr={4} color='white'>1.</Typography>
                                <Box sx={{ width: '60%', height: '40vh', backgroundColor: '#4e4e4e' }}></Box>
                            </ListItem>
                            <ListItem sx={{display: 'flex', justifyContent: 'center' }} onClick={() => setCurrentPage(2)}>
                                <Typography pr={4} color='white'>2.</Typography>
                                <Box sx={{ width: '60%', height: '40vh', backgroundColor: '#4e4e4e' }}></Box>
                            </ListItem>
                            <ListItem sx={{display: 'flex', justifyContent: 'center' }} onClick={() => setCurrentPage(3)}>
                                <Typography pr={4} color='white'>3.</Typography>
                                <Box sx={{ width: '60%', height: '40vh', backgroundColor: '#4e4e4e' }}></Box>
                            </ListItem>
                        </List>
                    </Box>
                </Grid>
                <Grid item xs={9} container>
                    <Grid item xs={12} sx={{ border: 1, borderColor: '#4e4e4e', height: '100%', width: '100%' }}>
                        <Grid item xs={12} sx={{ backgroundColor: '#4e4e4e', height: '48px', display: 'flex', verticalAlign: 'center' }}>
                            <Button sx={{ color: 'white' }}>Save</Button>
                            <Button sx={{ color: 'white' }}>Insert</Button>
                            <Button sx={{ color: 'white' }}>Edit</Button>
                            <Button sx={{ color: 'white' }}>Help</Button>
                        </Grid>
                        <Grid item xs={12} sx={{ height: '88vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Box sx={{ height: '95%', width: '95%', backgroundColor: '#4e4e4e' }}></Box>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item={true} xs={12} container sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                <Grid item xs={3} sx={{ height: '3vh', display: 'flex', alignItems: 'center' }}>
                    <Box sx={{ borderTop: 1, borderColor: '#4e4e4e', height: '100%', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Typography color='white'>Page {currentPage} of 31</Typography>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}