import { useEffect } from 'react'
//import Konva from 'konva'
import {Stage, Layer, Rect, Line, Image} from 'react-konva'
import { SketchPicker } from 'react-color'

function Editor(props) {

    const { tool, setTool, lines, setLines, trash, setTrash, colorWheelOpen, setColorWheelOpen, color, setColor, strokeWidth, setStrokeWidth, isDrawing, stageRef, image} = props;
    useEffect(() => {
        document.getElementById("editor-undo-btn").disabled = (lines.length === 0) ? true : false;
        document.getElementById("editor-redo-btn").disabled = (trash.length === 0) ? true : false;
    })

    const handleMouseDown = (e) => {
        isDrawing.current = true;
        const pos = e.target.getStage().getPointerPosition();
        setLines([...lines, { tool, points: [pos.x, pos.y], color: color, strokeWidth: strokeWidth }]);
        setTrash([]);
    };

    const handleMouseMove = (e) => {
        if (!isDrawing.current) {
            return;
        }
        const stage = e.target.getStage();
        const point = stage.getPointerPosition();
        let lastLine = lines[lines.length - 1];
        lastLine.points = lastLine.points.concat([point.x, point.y]);

        lines.splice(lines.length - 1, 1, lastLine);
        setLines(lines.concat());
    };

    const handleMouseUp = () => {
        isDrawing.current = false;  
    };

    const handleUndo = () => {
        if (lines.length > 0) {
            trash.push(lines.pop());
            setTrash(trash.slice());
            setLines(lines.slice());
        }
        else
            console.log("Undo error")
        
    }

    const handleRedo = () => {
        if (trash.length > 0) {
            lines.push(trash.pop())
            setLines(lines.slice())
            setTrash(trash.slice());
        }
        else 
            console.log("Redo error")
    }

    const handleColorChange = (color) => {
        setColor(color.hex);
        setColorWheelOpen(false)
    }

    let image1 = new window.Image();
    image1.src= image;
    
    let thing = 
    <Stage
        ref={stageRef}
        id="canvas"
        width={1500}
        height={1500}
        onMouseDown={handleMouseDown}
        onMousemove={handleMouseMove}
        onMouseup={handleMouseUp}
    >
        <Layer>
            <Rect x={0} y={0} width={1500} height={1500} fill='white'/>
                <Image 
                image={image1}/>
                {lines.map((line, i) => (
                <Line
                    key={i}
                    points={line.points}
                    stroke={line.color}
                    strokeWidth={line.strokeWidth}
                    tension={0.5}
                    lineCap="round"
                    globalCompositeOperation={
                    line.tool="source-over"
                    }
                />
                ))}
        </Layer>
    </Stage>
    
    return ( 
    <div id="stage-container-wrapper">
        <div id="editor-toolbar">
            <select value={tool} onChange={(e) => {setTool(e.target.value);}}>
                <option value="pen">Brush</option>
            </select>
            <select onChange={(e) => setStrokeWidth(e.target.value)}>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
                <option value={6}>6</option>
                <option value={7}>7</option>
                <option value={8}>8</option>
                <option value={9}>9</option>
                <option value={10}>10</option>
            </select>
            <div id="editor-color-btn" style={{width: '23px', height: '25px', backgroundColor: color}} onClick={() => setColorWheelOpen(!colorWheelOpen)}>
            </div>
            <div style={{zIndex: '10', position: 'absolute', marginTop: '25px', marginLeft: '65px'}}>{colorWheelOpen ? <SketchPicker color={color} onChangeComplete={handleColorChange}/> : ""}</div>
            <button id="editor-undo-btn" onClick={handleUndo}>
                undo
            </button>
            <button id="editor-redo-btn" onClick={handleRedo}>
                redo
            </button>
        </div>
        <div id="stage-container">
        
        {thing  }
          
        </div>
    </div>
    );
}

export default Editor;


// import React from 'react';
// import Konva from 'konva';
// import { createRoot } from 'react-dom/client';
// import { Stage, Layer, Shape, Line, Text, Image} from 'react-konva';

// const App = () => {
//   const [tool, setTool] = React.useState('pen');
//   const [lines, setLines] = React.useState([]);
//   const isDrawing = React.useRef(false);
//   const [image, setImage] = React.useState(null);

//   React.useEffect(() => {
//     loadImage();
//   }, [])
//   const loadImage = () => {
//     // save to "this" to remove "load" handler on unmount
//     let image = new window.Image();
//     image.src = 
//     image.onload = function() {
//       setImage(image)
//     }
//   }
  

//   const handleMouseDown = (e) => {
//     isDrawing.current = true;
//     const pos = e.target.getStage().getPointerPosition();
//     setLines([...lines, { tool, points: [pos.x, pos.y] }]);
//   };

//   const handleMouseMove = (e) => {
//     // no drawing - skipping
//     if (!isDrawing.current) {
//       return;
//     }
//     const stage = e.target.getStage();
//     const point = stage.getPointerPosition();
//     let lastLine = lines[lines.length - 1];
//     // add point
//     lastLine.points = lastLine.points.concat([point.x, point.y]);

//     // replace last
//     lines.splice(lines.length - 1, 1, lastLine);
//     setLines(lines.concat());
//   };

//   const handleMouseUp = () => {
//     isDrawing.current = false;
//   };

//     return (
//       <div>
//         <select
//         value={tool}
//         onChange={(e) => {
//           setTool(e.target.value);
//         }}
//       >
//         <option value="pen">Pen</option>
//         <option value="eraser">Eraser</option>
//       </select>
//       <Stage width={window.innerWidth} height={window.innerHeight}
//       onMouseDown={handleMouseDown}
//       onMousemove={handleMouseMove}
//       onMouseup={handleMouseUp}>
//         <Layer>
//         <Image
//         x={100}
//         y={100}
//         image={image}
//       />
//           <Shape
//             sceneFunc={(context, shape) => {
//               context.beginPath();
//               context.moveTo(20, 50);
//               context.lineTo(220, 80);
//               context.quadraticCurveTo(150, 100, 260, 170);
//               context.closePath();
//               // (!) Konva specific method, it is very important
//               context.fillStrokeShape(shape);
//             }}
//             fill="#00D2FF"
//             stroke="black"
//             strokeWidth={4}
//           />
//           {lines.map((line, i) => (
//             <Line
//               key={i}
//               points={line.points}
//               stroke="#df4b26"
//               strokeWidth={5}
//               tension={0.5}
//               lineCap="round"
//               globalCompositeOperation={
//                 line.tool === 'eraser' ? 'destination-out' : 'source-over'
//               }
//             />
//           ))}
//         </Layer>
//       </Stage>
      
//       </div>
//     );
// }

// const container = document.getElementById('root');
// const root = createRoot(container);
// root.render(<App />);
