import {Box, Typography, Grid} from '@mui/material'

function HomeWrapper() {

    let featuredComics = []

    let latestUpdates = [["Work 1", "1"], ["Work 2", "21"], ["Work 3", "14"], ["Work 4", "1123"], ["Work 5", "41"], ["Work 6", "11"], ["Work 7", "12"], ["Work 8", "1"], 
        ["Work 9", "1"], ["Work 10", "1"], ["Work 11", "1"], ["Work 12", "1"], ["Work 13", "1"], ["Work 14", "1"], ["Work 15", "1"], ["Work 16", "1"], ["Work 17", "1"], 
        ["Work 18", "1"], ["Work 19", "1"], ["Work 21", "1"], ["Work 21", "1"], ["Work 22", "1"], ["Work 23", "1"], ["Work 24", "1"], ["Work 24", "1"], ["Work 26", "1"], 
        ["Work 27", "1"], ["Work 28", "1"]]

    let firstColUpdates = "";
    for(let i = 0; i < 14; i++) {
        let missingLen = 100 - latestUpdates[i][0].length - 4 - latestUpdates[i][1].length
        let str = latestUpdates[i][0]
        for(let j = 0; j < missingLen; j++)
            str += '.'
        str += "Ch. " + latestUpdates[i][1]
        firstColUpdates += str + "\n"
    }

    let secondColUpdates = "";
    for(let i = 14; i < 28; i++) {
        let missingLen = 100 - latestUpdates[i][0].length - 4 - latestUpdates[i][1].length
        let str = latestUpdates[i][0]
        for(let j = 0; j < missingLen; j++)
            str += '.'
        str += "Ch. " + latestUpdates[i][1]
        secondColUpdates += str + "\n"
    }

    let firstCol = 
        <Typography sx = {{color: 'white'}}>
            {firstColUpdates}
        </Typography>
    let secondCol = 
        <Typography sx = {{color: 'white'}}>
            {secondColUpdates}  
        </Typography>

    return (
        <Grid container sx = {{ flexDirection: 'column' }}>
            <Grid item xs = {12} sx={{ height: '100vh' }}>

                <Grid pt={5} pb={5}  xs={12} sx={{ height: '30vh', justifyContent: 'center', display: 'flex' }}>
                    <Box sx = {{position: 'relative', backgroundColor: '#3d3d3d',  width: '70%', height: '100%', borderRadius: '15px', display: 'flex'}}>

                        <Box sx = {{position: 'relative', backgroundColor: 'black', width: '10%', left: '3%', height: '90%', top: '5%'}}/>
                        <Box sx = {{position: 'relative', backgroundColor: 'black', width: '10%', left: '5%', height: '90%', top: '5%'}}/>
                        <Box sx = {{position: 'relative', backgroundColor: 'black', width: '10%', left: '7%', height: '90%', top: '5%'}}/>
                        <Box sx = {{position: 'relative', backgroundColor: 'black', width: '10%', left: '9%', height: '90%', top: '5%'}}/>
                        <Box sx = {{position: 'relative', backgroundColor: 'black', width: '10%', left: '11%', height: '90%', top: '5%'}}/>
                        <Box sx = {{position: 'relative', backgroundColor: 'black', width: '10%', left: '13%', height: '90%', top: '5%'}}/>
                        <Box sx = {{position: 'relative', backgroundColor: 'black', width: '10%', left: '15%', height: '90%', top: '5%'}}/>
                        <Box sx = {{position: 'relative', backgroundColor: 'black', width: '10%', left: '17%', height: '90%', top: '5%'}}/>

                    </Box>
                </Grid>

                <Grid xs={12} sx={{ height: '5vh', justifyContent: 'center', display: 'flex' }}>
                    <Typography sx = {{color: 'white', fontSize: '16pt'}}>
                        Latest Updates
                    </Typography>
                </Grid>

                <Grid xs={12} sx={{ height: '50vh', justifyContent: 'center', display: 'flex'}}>
                    <Box xs={12} sx = {{position: 'relative', border: 0.5 , borderColor: 'white',  width: '80%', height: '25%', height: '100%', borderRadius: '15px'}}>

                        <Grid container sx = {{justifyContent: 'center', display: 'flex'}}>
                            <Grid item xs = {6} >
                                {firstCol}
                            </Grid>
                            <Grid item xs = {6} > 
                                {secondCol}
                            </Grid>
                        </Grid>

                    </Box>
                </Grid>

            </Grid>
        </Grid>
    )

}

export default HomeWrapper;