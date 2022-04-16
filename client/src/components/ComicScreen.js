import { useContext, useState } from 'react'
import { Typography, Box, Grid, Button, MenuList, MenuItem, List, ListItem, ListItemText, ListItemAvatar, Avatar } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import batePic from '../testimgs/bate.jpg'
import { useNavigate } from 'react-router-dom'
import GlobalStoreContext from '../store'

export default function ComicScreen() {
    const {store} = useContext(GlobalStoreContext)
    let navigate = useNavigate()
    
    const [status, setStatus] = useState("chapters");

    let chapter =
        <MenuItem sx={{ p: '2px' }}>
            <Box sx={{ width: '100%', border: 1, borderColor: '#3d3d3d', display: 'flex', alignItems: 'flex-start', verticalAlign: 'center', p: 1 }}>
                <Typography color='white' sx={{ flexGrow: .94 }}>Chapter Name</Typography>
                <Typography color='white' sx={{ flexGrow: .06, fontSize: 12 }}>Date Released</Typography>
            </Box>
        </MenuItem>

    let display =   
        <MenuList>
            { chapter }
            { chapter }
            { chapter }
            { chapter }
            { chapter }
            { chapter }
            { chapter }
            { chapter }
            { chapter }
            { chapter }
            { chapter }
            { chapter }
            { chapter }
            { chapter }
            { chapter }
            { chapter }
        </MenuList>

    let comment =
        <ListItem>
            <ListItemAvatar>
                <Avatar>
                    <AccountCircle/>
                </Avatar>
            </ListItemAvatar>
            <ListItemText primary={ <Typography color='white'>User</Typography> } secondary={ <Typography color='white'>comment</Typography> }/>
        </ListItem>

    if (status === "comments") {
        display =   <List>
                        { comment }
                        { comment }
                        { comment }
                    </List>
    }

    return (
        <Box sx={{ paddingTop: 10, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <Grid item={true} xs={11} container sx={{ display: 'flex', justifyContent: 'center', minWidth: '2300px' }} pb={4}>
                <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'flex-end' }} pr={10}>
                    <Box sx={{ border: 1, borderColor: '#4e4e4e', height: '352px', width: '256px' }}>
                            <img src={batePic} sx={{ width: '100%', height: '100%' }} className = "image-contain" alt="Pic"/>
                    </Box>
                </Grid>
                <Grid item xs={8} container spacing={2}>
                    <Grid item xs={12}>
                        <Typography color='white' sx={{ fontSize: 50 }}>{(store.work !== null) ? store.work.title : ""}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography color='white' sx={{ fontSize: 20, position: 'relative', bottom: '50%' }}>{(store.work !== null) ? store.work.creatorName : ""}</Typography>
                    </Grid>
                    <Grid item xs={1}>
                        <Typography color='white'>Views: {(store.work !== null) ? store.work.views : "0"}</Typography>
                    </Grid>
                    <Grid item xs={11}>
                        <Typography color='white'>
                            Rating: {(store.work !== null && store.work.ratings.length > 0) ? store.work.ratings.reduce((total, rating) => total += rating.value, 0)/store.work.ratings.length : "0"}/5
                        </Typography>
                    </Grid>
                    <Grid item xs={3.3} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Button variant='contained' onClick = {() => navigate('/chapter/')} sx={{ backgroundColor:'#9c4247', "&:hover": { backgroundColor: 'red' }, minWidth:'200px', maxWidth: '8vw', height: '38px' }}>Continue Reading</Button>
                        <Button variant='contained' sx={{ backgroundColor:'#9c4247', "&:hover": { backgroundColor: 'red' }, minWidth:'200px', maxWidth: '8vw', height: '38px' }}>Bookmark</Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Box sx={{ width: '70%', height: '137px' }}>
                            <Typography color='white'>{(store.work !== null) ? store.work.description : ""}</Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item={true} xs={7} container spacing={2} sx={{ display: 'flex', alignItems: 'center', minWidth: '1500px' }}>
                <Grid item xs={2} sx={{ display: 'flex', justifyContent: 'space-between', position: 'relative', left: '1%' }}>
                    <Button onClick={() => setStatus("chapters")} sx={{ color:'#9c4247' }}>Chapters</Button>
                    <Button onClick={() => setStatus("comments")} sx={{ color:'#9c4247' }}>Comments</Button>
                </Grid>
                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Box sx={{ height: '100%', width: '100%', maxHeight: '50vh', overflowY: 'scroll' }}>
                        { display }
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}