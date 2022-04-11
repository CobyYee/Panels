import { Box, Typography, Grid, List, ListItem, Button } from '@mui/material'
import ContentContext from '../content'
import { useContext } from 'react'
import batePic from '../testimgs/bate.jpg'
import naruto from '../testimgs/naruto.jpg'
import bleach from '../testimgs/bleach.jpg'
import lookism from '../testimgs/lookism.jpg'
import mha from '../testimgs/mha.jpg'
import onepiece from '../testimgs/onepiece.jpg'
import sao from '../testimgs/sao.jpg'
import rezero from '../testimgs/rezero.jpg'
import { useNavigate } from 'react-router-dom'

function HomeScreen() {
    const {content} = useContext(ContentContext)
    let navigate = useNavigate();

    let latestUpdates = [["Work 1", "1"], ["Work 2", "21"], ["Work 3", "14"], ["Work 4", "1123"], ["Work 5", "41"], ["Work 6", "11"], ["Work 7", "12"], ["Work 8", "1"], 
        ["Work 9", "1"], ["Work 10", "1"], ["Work 11", "1"], ["Work 12", "1"], ["Work 13", "1"]]

    return (
        <Grid container sx = {{ flexDirection: 'column' }}>
            <Grid item xs = {12} sx={{ height: '100vh' }}>

                <Grid item pt={5} pb={5}  xs={12} sx={{ height: '30vh', justifyContent: 'center', display: 'flex', minHeight: '400px' }}>
                    <Box sx = {{ position: 'relative', backgroundColor: '#3d3d3d', width: '70%', height: '100%', borderRadius: '15px', display: 'flex', minWidth: '1800px' }}>
                        <Box sx = {{position: 'relative', backgroundColor: 'black', width: '10%', left: '3%', height: '90%', top: '5%', minWidth: '180px', minHeight: '290px' }}>
                            <img src={batePic} className = "image-contain" alt="Pic" onClick = {() => navigate('/comic/')}/>
                        </Box>
                        <Box sx = {{position: 'relative', backgroundColor: 'black', width: '10%', left: '5%', height: '90%', top: '5%', minWidth: '180px', minHeight: '290px' }}>
                            <img src={naruto} className = "image-contain" alt="Pic"  onClick = {() => navigate('/comic/')}/>
                        </Box>
                        <Box sx = {{position: 'relative', backgroundColor: 'black', width: '10%', left: '7%', height: '90%', top: '5%', minWidth: '180px', minHeight: '290px' }}>
                            <img src={bleach} className = "image-contain" alt="Pic"  onClick = {() => navigate('/comic/')}/>
                        </Box>
                        <Box sx = {{position: 'relative', backgroundColor: 'black', width: '10%', left: '9%', height: '90%', top: '5%', minWidth: '180px', minHeight: '290px' }}>
                            <img src={lookism} className = "image-contain" alt="Pic"  onClick = {() => navigate('/comic/')}/>
                        </Box>
                        <Box sx = {{position: 'relative', backgroundColor: 'black', width: '10%', left: '11%', height: '90%', top: '5%', minWidth: '180px', minHeight: '290px' }}>
                            <img src={mha} className = "image-contain" alt="Pic"  onClick = {() => navigate('/comic/')}/>
                        </Box>
                        <Box sx = {{position: 'relative', backgroundColor: 'black', width: '10%', left: '13%', height: '90%', top: '5%', minWidth: '180px', minHeight: '290px' }}>
                            <img src={onepiece} className = "image-contain" alt="Pic"  onClick = {() => navigate('/comic/')}/>
                        </Box>
                        <Box sx = {{position: 'relative', backgroundColor: 'black', width: '10%', left: '15%', height: '90%', top: '5%', minWidth: '180px', minHeight: '290px' }}>
                            <img src={rezero} className = "image-contain" alt="Pic"  onClick = {() => navigate('/comic/')}/>
                        </Box>
                        <Box sx = {{position: 'relative', backgroundColor: 'black', width: '10%', left: '17%', height: '90%', top: '5%', minWidth: '180px', minHeight: '290px' }}>
                            <img src={sao} className = "image-contain" alt="Pic"  onClick = {() => navigate('/comic/')}/>
                        </Box>
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
                            <Grid item xs = {6} sx={{ p: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <List sx={{ width: '100%', height: '100%' }}>
                                {
                                    latestUpdates.map((work, index) => (
                                        <ListItem sx={{ height: '36px' }}>
                                            <Box sx={{ borderRadius: 1, width: '100%', display: 'flex', alignItems: 'center', backgroundColor: (index % 2 === 0) ? '#2d2d2d' : 'none' } }>
                                                <Box sx={{ flexGrow: 1 }}>
                                                    <Button onClick = {() => navigate('/comic/')} sx={{ color: 'white', flexGrow: 1 }}>{ work[0] }</Button>
                                                </Box>
                                                <Button onClick = {() => navigate('/chapter/')} sx={{ color: 'white', height: '100%' }}>Chapter { work[1] }</Button>
                                            </Box>
                                        </ListItem>
                                    ))
                                }
                                </List>
                            </Grid>
                            <Grid item xs = {6} sx={{ p: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <List sx={{ width: '100%', height: '100%' }}>
                                {
                                    latestUpdates.map((work, index) => (
                                        <ListItem key={"latest" + index} sx={{ height: '36px' }}>
                                            <Box sx={{ borderRadius: 1, width: '100%', display: 'flex', alignItems: 'center', backgroundColor: (index % 2 === 0) ? '#2d2d2d' : 'none' } }>
                                                <Box sx={{ flexGrow: 1 }}>
                                                    <Button onClick = {() => navigate('/comic/')} sx={{ color: 'white', flexGrow: 1 }}>{ work[0] }</Button>
                                                </Box>
                                                <Button onClick = {() => navigate('/chapter/')} sx={{ color: 'white', height: '100%' }}>Chapter { work[1] }</Button>
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