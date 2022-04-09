import { useState } from 'react'
import { Typography, Box, Container, Grid, Button } from '@mui/material';

export default function ComicScreen() {
    return (
        <Box sx={{ paddingTop: 10, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <Grid item={true} xs={11} container sx={{ display: 'flex', justifyContent: 'center' }}>
                <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Box sx={{ border: 1, borderColor: '#4e4e4e', height: '100%' }}>
                        <Typography color='white'>image</Typography>
                    </Box>
                </Grid>
                <Grid item xs={8} sx={{ display: 'flex', justifyContent: 'start' }}>
                    <Typography color='white' sx={{ fontSize: 50 }}>Title</Typography>
                </Grid>
                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Typography color='white'>Chapters Comments</Typography>
                </Grid>
                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Box sx={{ border: 1, borderColor: '#4e4e4e', height: '100%' }}>
                        <Typography color='white'>bottom text</Typography>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}