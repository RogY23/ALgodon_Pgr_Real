import React, {useState} from 'react';

import { BaseEdge, EdgeLabelRenderer,  getSmoothStepPath } from 'reactflow';  

//import './buttonedge.css';



// conectorButton.jsx; 

const onEdgeClick = (evt, mesage) => {

  // prevenir comportamiento por defecto
  evt.stopPropagation();

  console.log(mesage)

}


export default function ConectorButton
(props) {

  const {
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    style = {},
    markerEnd
  } = props;

  const [edgePath, labelX, labelY] = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX, 
    targetY,
    targetPosition
  });

  return (
    <>
      <BaseEdge path={edgePath} markerEnd={markerEnd} style={style} />

      <EdgeLabelRenderer>
        <div
          style={{
            position: 'absolute',
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            fontSize: 12,
            pointerEvents: 'all'
          }}
          className="nodrag nopan"
        >
          <button style={{
              width: '20px',
              height: '20px',
              background: '#eee',
              border: '1px solid #fff',
              cursor: 'pointer',
              borderRadius: '50%',
              fontsize: '12px',
              lineheight: '1',
              textAlign:'center',
              
            }} onClick={(evt) => onEdgeClick(evt)}>
            +
          </button>
        </div>
      </EdgeLabelRenderer>
    </>
  );
}