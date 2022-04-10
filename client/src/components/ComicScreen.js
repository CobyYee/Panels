import { useState } from 'react'
import { Typography, Box, Container, Grid, Button, MenuList, MenuItem, List, ListItem, ListItemText, ListItemAvatar } from '@mui/material';
import batePic from '../testimgs/bate.jpg'

export default function ComicScreen() {
    const [status, setStatus] = useState("chapters");

    let display =   <MenuList>
                    <MenuItem>
                        <Typography color='white'>Chapter 6</Typography>
                    </MenuItem>
                    <MenuItem>
                        <Typography color='white'>Chapter 5</Typography>
                    </MenuItem>
                    <MenuItem>
                        <Typography color='white'>Chapter 4</Typography>
                    </MenuItem>
                    <MenuItem>
                        <Typography color='white'>Chapter 3</Typography>
                    </MenuItem>
                    <MenuItem>
                        <Typography color='white'>Chapter 2</Typography>
                    </MenuItem>
                    <MenuItem>
                        <Typography color='white'>Chapter 1</Typography>
                    </MenuItem>
                </MenuList>

    if (status === "comments") {
        display =   <List>
                        <ListItem>
                            <ListItemText primary="USER" secondary={ <Typography color='white'>comment</Typography> }/>
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="USER" secondary={ <Typography color='white'>comment</Typography> }/>
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="USER" secondary={ <Typography color='white'>comment</Typography> }/>
                        </ListItem>
                    </List>
    }

    return (
        <Box sx={{ paddingTop: 10, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <Grid item={true} xs={11} container sx={{ display: 'flex', justifyContent: 'center' }} pb={4}>
                <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'flex-end' }} pr={10}>
                    <Box sx={{ border: 1, borderColor: '#4e4e4e', height: '100%', width: '35%' }}>
                            <img src={batePic} class = "image-contain" alt="Pic"/>
                    </Box>
                </Grid>
                <Grid item xs={8} container spacing={2}>
                    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'start' }}>
                        <Typography color='white' sx={{ fontSize: 50 }}>Title</Typography>
                    </Grid>
                    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'start' }}>
                        <Typography color='white' sx={{ fontSize: 20 }}>Author name</Typography>
                    </Grid>
                    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'start' }}>
                        <Typography color='white'>Views: #        Rating: #/5</Typography>
                    </Grid>
                    <Grid item xs={3.4} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Button variant='contained' sx={{ backgroundColor:'#9c4247', "&:hover": { backgroundColor: 'red' }, minWidth:'8vw' }}>Continue Reading</Button>
                        <Button variant='contained' sx={{ backgroundColor:'#9c4247', "&:hover": { backgroundColor: 'red' }, minWidth:'8vw' }}>Bookmark</Button>
                    </Grid>
                    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'start' }}>
                        <Box sx={{ width: '70%' }}>
                        <Typography color='white'>A long description is a way to provide long alternative text for non-text elements, such as images. Generally, alternative text exceeding 250 characters, which cannot be made more concise without making it 
                            less descriptive or meaningful, should have a long description. Examples of suitable use of long description are charts, graphs, maps, infographics, and other complex images. Like alternative text, long description should be 
                            descriptive and meaningful. It should also include all text that is incorporated into the image. A long description should provide visually-impaired users with as much information as sighted users would understand from the image.
                        </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item={true} xs={11} container spacing={2}>
                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Button onClick={() => setStatus("chapters")}>Chapters</Button>
                    <Button onClick={() => setStatus("comments")}>Comments</Button>
                </Grid>
                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Box sx={{ border: 1, borderColor: '#4e4e4e', height: '100%', width: '57vw' }}>
                        { display }
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}