import { GlobalStoreContext }  from '../store';
import { useContext, useState, useRef, useEffect } from 'react'
import { Grid, Button, TextField, Box } from '@mui/material'
import { useNavigate } from "react-router-dom";
import exStory from '../testimgs/exStory.jpg';
import exComic from '../testimgs/exComic.jpg';
import Editor from './Editor';
import Konva from 'konva'
import {Stage, Layer, Rect, Line, Text} from 'react-konva'

function StoryBoard(props) {
    const { store } = useContext(GlobalStoreContext)
    const [tool, setTool] = useState('pen');
    const [lines, setLines] = useState([]);
    const [trash, setTrash] = useState([]);
    const isDrawing = useRef(false);
    const stageRef = useRef(null);
    let navigate = useNavigate();

    useEffect(() => {
        document.getElementById("editor-undo-btn").disabled = (lines.length === 0) ? true : false;
        document.getElementById("editor-redo-btn").disabled = (trash.length === 0) ? true : false;
    })

    function handleSave(event) {
        console.log(stageRef.current.toDataURL());
        console.log(stageRef.current.toJSON());
        store.createKonva(stageRef.current.toDataURL());
        navigate('/profile')
    }

    let stage = {"attrs":{"width":1920,"height":486,"id":"canvas"},"className":"Stage","children":[{"attrs":{},"className":"Layer","children":[{"attrs":{"points":[500.79998779296875,56,500.79998779296875,79,500.79998779296875,84,500.79998779296875,85],"stroke":"#df4b26","strokeWidth":5,"tension":0.5,"lineCap":"round"},"className":"Line"},{"attrs":{"points":[557.7999877929688,47,557.7999877929688,50,557.7999877929688,59,556.7999877929688,63,552.7999877929688,92],"stroke":"#df4b26","strokeWidth":5,"tension":0.5,"lineCap":"round"},"className":"Line"},{"attrs":{"points":[478.79998779296875,109,478.79998779296875,111,482.79998779296875,118,486.79998779296875,126,492.79998779296875,133,521.7999877929688,144,559.7999877929688,142,584.7999877929688,132,600.7999877929688,120],"stroke":"#df4b26","strokeWidth":5,"tension":0.5,"lineCap":"round"},"className":"Line"}]}]}
    //let stage = {"attrs":{},"className":"Layer","children":[{"attrs":{"points":[373.79998779296875,79,373.79998779296875,82,373.79998779296875,99,374.79998779296875,109,375.79998779296875,112,375.79998779296875,113],"stroke":"#df4b26","strokeWidth":5,"tension":0.5,"lineCap":"round"},"className":"Line"},{"attrs":{"points":[435.79998779296875,76,435.79998779296875,77,435.79998779296875,83,435.79998779296875,84,434.79998779296875,99,434.79998779296875,103,434.79998779296875,109],"stroke":"#df4b26","strokeWidth":5,"tension":0.5,"lineCap":"round"},"className":"Line"},{"attrs":{"points":[351.79998779296875,134,352.79998779296875,137,358.79998779296875,145,371.79998779296875,159,381.79998779296875,164,406.79998779296875,166,419.79998779296875,163,437.79998779296875,147],"stroke":"#df4b26","strokeWidth":5,"tension":0.5,"lineCap":"round"},"className":"Line"}]};
    
    // const handleMouseDown = (e) => {
    //     isDrawing.current = true;
    //     const pos = e.target.getStage().getPointerPosition();
    //     setLines([...lines, { tool, points: [pos.x, pos.y] }]);
    //     setTrash([]);
    // };

    // const handleMouseMove = (e) => {
    //     // no drawing - skipping
    //     if (!isDrawing.current) {
    //         return;
    //     }
    //     const stage = e.target.getStage();
    //     const point = stage.getPointerPosition();
    //     let lastLine = lines[lines.length - 1];
    //     // add point
    //     lastLine.points = lastLine.points.concat([point.x, point.y]);

    //     // replace last
    //     lines.splice(lines.length - 1, 1, lastLine);
    //     setLines(lines.concat());
    // };

    // const handleMouseUp = () => {
    //     isDrawing.current = false;  
    // };

    // const handleUndo = () => {
    //     if (lines.length > 0) {
    //         trash.push(lines.pop());
    //         setTrash(trash.slice());
    //         setLines(lines.slice());
    //     }
    //     else
    //         console.log("Undo error")
        
    // }

    // const handleRedo = () => {
    //     if (trash.length > 0) {
    //         lines.push(trash.pop())
    //         setLines(lines.slice())
    //         setTrash(trash.slice());
    //     }
    //     else 
    //         console.log("Redo error")
    //}

    // let canva = <div id="stage-container">
    //             { props.stage ? Konva.Node.create(props.stage, "stage-container") :
    //             <Stage
    //                 width={window.innerWidth}
    //                 height={window.innerHeight}
    //                 onMouseDown={handleMouseDown}
    //                 onMousemove={handleMouseMove}
    //                 onMouseup={handleMouseUp}
    //                 ref={stageRef}
    //             >
    //                 <Layer>
    //                     {lines.map((line, i) => (
    //                     <Line
    //                         key={i}
    //                         points={line.points}
    //                         stroke="#df4b26"
    //                         strokeWidth={5}
    //                         tension={0.5}
    //                         lineCap="round"
    //                         globalCompositeOperation={ line.tool === 'eraser' ? 'destination-out' : 'source-over' }
    //                     />
    //                     ))}
    //                 </Layer>
    //             </Stage>
    //             }                       
    //             </div>;

    let editor = "";
    if(store.mode === "comic") {
        editor = 
        <Box sx={{ height: '80vh', position: 'relative', backgroundColor: 'white', borderRadius: '10px', width: '70%', left: '15%'}}>
            <Editor tool={tool} setTool={setTool} lines={lines} setLines={setLines} trash={trash} setTrash={setTrash} isDrawing={isDrawing} stageRef={stageRef} stage={stage}/>
        </Box>
    }
    else {
        editor = <Box sx={{ height: '80vh', position: 'relative', backgroundColor: 'black', borderRadius: '10px', width: '90%', left: '5%'}}>
            <img src={exStory} style={{ width: '100%', height: '100%' }} alt=""/>
        </Box>
    }

    let component = 
        <Grid container sx = {{ flexDirection: 'row'}}>
            <Grid item xs = {3} >
                <Button variant="text" onClick = {() => navigate('/profile/')} sx = {{color: 'white', fontSize: '28px'}}>Back to Profile</Button>
            </Grid>
            <Grid item xs = {6} sx = {{display: 'flex', justifyContent:'center'}} >
                <TextField placeholder = "Name" sx = {{input: {color: 'white'}}}>  </TextField>
            </Grid>
            <Grid item xs = {3}/>
            <div id="container"></div>
            <Grid item xs = {12}>
                {editor}
            </Grid>
            <Grid item xs = {10}/>
            <Grid item xs = {1}>
                <Button variant="contained" sx={{ backgroundColor:'#9c4247', "&:hover":  { backgroundColor: '#b8434b' } }} onClick={handleSave}>Save</Button>
            </Grid>
            <Grid item xs = {1}>
                <Button variant="contained" sx={{ backgroundColor:'#9c4247', "&:hover": { backgroundColor: '#b8434b' } }}>Publish</Button>
            </Grid>
        </Grid>
        
        return (component)
}

export default StoryBoard;