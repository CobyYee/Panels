import { Box, Typography, Grid, List, ListItem, Button } from '@mui/material'
import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { GlobalStoreContext }  from '../store';

function HomeScreen() {
    const {store} = useContext(GlobalStoreContext)
    let navigate = useNavigate();

    useEffect(() => {
        store.home();
    }, [store.mode])

    function handleLoad(workId) {
        store.loadWork(workId);
        navigate("/comic/" + workId);
    }
    
    return (
        <Grid container>
            <Grid item xs={12}>
                <Grid id="home_grid_container" item xs={12}>
                    <Box id="home_image_container">
                    {
                        (store.images && store.images.length <= 8) ? 
                            store.images.map((image, index) => (
                                <Button id="home_image_selector" key={"featured" + index}>
                                    <img className = "image-contain" 
                                         src={image} 
                                         alt="" 
                                         onClick={() => handleLoad(store.works[index]._id)}
                                    />
                                </Button>
                        )) : ""
                    }
                    </Box>
                </Grid>

                <Grid id="latest_updates_title_container" item xs={12}>
                    <Typography id="latest_updates_title">
                        Latest Updates
                    </Typography>
                </Grid>

                <Grid id="latest_updates_grid_container" item xs={12}>
                    <Box id="latest_updates_box_container" xs={12}>
                        <List id="latest_updates_list" container="true">
                        {
                            store.works.map((work, index) => (
                                <ListItem id="latest_updates_card" key={"latest" + index}>
                                    <Box id={(index % 2 === 0 ? "latest_updates_even" : "latest_updates_odd")}>
                                        <Box sx={{ flexGrow: 1 }}>
                                            <Button id="home_button" onClick={() => handleLoad(work._id)}>{work.title}</Button>
                                        </Box>
                                        <Button id="home_button" onClick={() => navigate('/chapter/')}>{"Chapter " + index}</Button>
                                    </Box>
                                </ListItem>
                            ))
                        }
                        </List>
                    </Box>
                </Grid>
            </Grid>
        </Grid>
    )

}

export default HomeScreen;