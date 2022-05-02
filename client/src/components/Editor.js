import { useRef, useState, useEffect } from 'react'
import Konva from 'konva'
import {Stage, Layer, Rect, Line, Text, Image} from 'react-konva'

function Editor(props) {

    const { tool, setTool, lines, setLines, trash, setTrash, isDrawing, stageRef, image} = props;
    useEffect(() => {
        document.getElementById("editor-undo-btn").disabled = (lines.length === 0) ? true : false;
        document.getElementById("editor-redo-btn").disabled = (trash.length === 0) ? true : false;
    })

    const handleMouseDown = (e) => {
        isDrawing.current = true;
        const pos = e.target.getStage().getPointerPosition();
        setLines([...lines, { tool, points: [pos.x, pos.y] }]);
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

    let image1 = new window.Image();
    image1.src= image;
    image1.height = window.innerHeight;
    image1.width = window.innerWidth;
    
    console.log(stageRef)
    let thing = 
    <Stage
        ref={stageRef}
        id="canvas"
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={handleMouseDown}
        onMousemove={handleMouseMove}
        onMouseup={handleMouseUp}
    >
        <Layer>
            {lines.map((line, i) => (
            <Line
                key={i}
                points={line.points}
                stroke="#df4b26"
                strokeWidth={5}
                tension={0.5}
                lineCap="round"
                globalCompositeOperation={
                line.tool === 'eraser' ? 'destination-out' : 'source-over'
                }
            />
            ))}
        </Layer>
    </Stage>
    
    return ( 
    <div id="stage-container-wrapper">
        <select value={tool} onChange={(e) => {setTool(e.target.value);}}>
            <option value="pen">Pen</option>
            <option value="eraser">Eraser</option>
        </select>
        <button id="editor-undo-btn" onClick={handleUndo}>
            undo
        </button>
        <button id="editor-redo-btn" onClick={handleRedo}>
            redo
        </button>
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
