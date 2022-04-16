import { Box, Typography, Grid, List, ListItem, Button } from '@mui/material'
import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { GlobalStoreContext }  from '../store';

function HomeScreen() {
    const {store} = useContext(GlobalStoreContext)
    let navigate = useNavigate();

    // let featuredWorks = [batePic, naruto, bleach, lookism, mha, onepiece, sao, rezero]

    useEffect(() => {
        store.home();
    }, [])

    // let img = new Image();
    // img.src = store.store.images[1];
    // let canvas = document.createElement("canvas");
    // let img1 = document.createElement("img");
    // img.onload = function () {
    //     let context = canvas.getContext("2d");
    //     context.drawImage(img, 0, 0 )
    //     let dataURL = canvas.toDataURL(img.type)
    //     img1.src = dataURL;
    // }
    // document.getElementById('root').appendChild(img1)
    
    return (
        <Grid container sx = {{ flexDirection: 'column' }}>
            <Grid item xs = {12} sx={{ height: '100vh' }}>
                <Grid item pt={5} pb={5} xs={12} sx={{ height: '30vh', justifyContent: 'center', display: 'flex', minHeight: '400px' }}>
                    <Box sx = {{ backgroundColor: '#3d3d3d', width: '60%', borderRadius: '6px', minWidth: '1780px', display: 'flex', justifyContent: 'space-around', verticalAlign: 'center' }}>
                    {
                        store.images ? store.images.map((image, index) => (
                            <Button key={ "featured" + index } sx = {{ backgroundColor: 'transparent', position: 'relative' }}>
                                <img src={image} className = "image-contain" alt="Pic" onClick = {() => navigate('/comic/')}/>
                            </Button>
                        )) : ""
                    }
                    </Box>
                </Grid>

                <Grid item xs={12} sx={{ height: '5vh', justifyContent: 'center', display: 'flex' }}>
                    <Typography sx = {{color: 'white', fontSize: '16pt'}}>
                        Latest Updates
                    </Typography>
                </Grid>

                <Grid item xs={12} sx={{ maxHeight: '50vh', justifyContent: 'center', display: 'flex' }}>
                    <Box xs={12} sx = {{ position: 'relative', border: 1 , borderColor: '#4e4e4e',  width: '80%', height: '100%', borderRadius: '15px', maxWidth: '1780px' }}>
                        <Grid item container sx = {{ display: 'flex' }}>
                            <Grid item xs = {12} sx={{ p: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <List container="true" sx={{ width: '100%', height: '100%', columns: 2 }}>
                                {
                                    store.works.map((work, index) => (
                                        <ListItem key={"latest" + index} sx={{ height: '36px' }}>
                                            <Box sx={{ borderRadius: 1, width: '100%', display: 'flex', alignItems: 'center', backgroundColor: (index % 2 === 0) ? '#2d2d2d' : 'none' } }>
                                                <Box sx={{ flexGrow: 1 }}>
                                                    <Button onClick = {() => navigate('/comic/')} sx={{ color: 'white', flexGrow: 1 }}>{ work.title }</Button>
                                                </Box>
                                                <Button onClick = {() => navigate('/chapter/')} sx={{ color: 'white', height: '100%' }}>{"Chapter " + index }</Button>
                                            </Box>
                                        </ListItem>
                                    ))
                                }
                                </List>
                            </Grid>
                        </Grid>

                    </Box>
                </Grid>

            </Grid>
        </Grid>
    )

}

export default HomeScreen;