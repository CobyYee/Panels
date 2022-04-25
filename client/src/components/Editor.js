import { useRef, useState, useEffect } from 'react'
import Konva from 'konva'
import {Stage, Layer, Rect, Line, Text} from 'react-konva'

function Editor(props) {

    const { tool, setTool, lines, setLines, trash, setTrash, isDrawing, stageRef } = props;
    useEffect(() => {
        document.getElementById("editor-undo-btn").disabled = (lines.length === 0) ? true : false;
        document.getElementById("editor-redo-btn").disabled = (trash.length === 0) ? true : false;
    })

    // useEffect(() => {
    //     if (props.stage) {
    //         let stage = Konva.Node.create(props.stage, "stage-container");
    //         //stageRef.current.add(layer);
    //         stage.addEventListener("onMouseDown", handleMouseDown);
    //         stage.addEventListener("onMousemove", handleMouseMove);
    //         console.log(stage)
    //     }
    // }, [props.stage])

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
    
    console.log(thing)
    return ( 
    <div>
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
        
        {thing}
          
        </div>
    </div>
    );
}

export default Editor;