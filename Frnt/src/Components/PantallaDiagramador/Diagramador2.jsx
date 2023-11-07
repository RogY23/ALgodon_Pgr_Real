import React, { useState, useRef, useCallback } from "react";
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
} from "reactflow";
import "reactflow/dist/style.css";

import "./index.css";
import Sidebar from "./BarraHerramientas";
import NodoEntrada from "./NodosFiguras/NodoEntrada";
import NodoDecision from "./NodosFiguras/NodoDecision";
import NodoDecisionFin from "./NodosFiguras/NodoDecisionFin";
import NodoInicio from "./NodosFiguras/NodoInicio";
import Nodofin from "./NodosFiguras/Nodofin";
import { BaseEdge, EdgeLabelRenderer, getSmoothStepPath } from "reactflow";

//import './buttonedge.css';

// conectorButton.jsx;

const nodeTypes = {
  Entrada: NodoEntrada,
  Decision: NodoDecision,
  DecisionFin: NodoDecisionFin,
  Inicio: NodoInicio,
  Fin: Nodofin,
};

const initialNodes = (id1, id2) => [
  {
    id: id1,
    type: "Inicio",
    data: { label: "Ini" },
    position: { x: 300, y: 5 },
  },
  {
    id: id2,
    type: "Fin",
    data: { label: "Fin" },
    position: { x: 250, y: 100 },
  },
];

let id = 0;

const getId = () => `dndnode_${id++}`;

const DnDFlow = () => {
  const initialEdge = (id1, id2) => [
    {
      type: "ConectorButton",
      id: getId(),
      source: id1,
      target: id2,
    },
  ];


  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(
    initialNodes(getId(), getId())
  );
  const [edges, setEdges, onEdgesChange] = useEdgesState(
    initialEdge(nodes[0].id, nodes[1].id)
  );

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  );
  //micodigo
  const edgeTypes = {
    ConectorButton: ConectorButton,
  };



  
// ...

function ConectorButton(props) {
const onEdgeClick = (evt, edge) => {
  evt.stopPropagation();

  // Obtén los IDs de los nodos fuente y destino del borde
  const sourceNodeId = edge.source;
  const targetNodeId = edge.target;

  // Encuentra los nodos correspondientes en la lista de nodos
  const sourceNode = nodes.find((node) => node.id === sourceNodeId);
  const targetNode = nodes.find((node) => node.id === targetNodeId);

  if (sourceNode && targetNode) {
    console.log("Nodo fuente ID:", sourceNode.id);
    console.log("Nodo destino ID:", targetNode.id);
  }

  console.log("hola");

  setNodes(nds => nds.concat({
    id:getId(),
    type: 'default', 
    position: { x: 250, y: 100 },
    data: { label: `New Node ${id}` }
  }));
  
};

  const {
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    style = {},
    markerEnd,// Agrega onEdgeClick como una prop
  } = props;

  const [edgePath, labelX, labelY] = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const handleEdgeButtonClick = (evt) => {
    // Llama a onEdgeClick con los parámetros necesarios
    console.log("Botón de borde clicado"); 
    onEdgeClick(evt);
  };

  return (
    <>
      <BaseEdge path={edgePath} markerEnd={markerEnd} style={style} />

      <EdgeLabelRenderer>
        <div
          style={{
            position: "absolute",
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            fontSize: 12,
            pointerEvents: "all",
          }}
          className="nodrag nopan"
        >
          <button
            style={{
              width: "20px",
              height: "20px",
              background: "#eee",
              border: "1px solid #fff",
              cursor: "pointer",
              borderRadius: "50%",
              fontsize: "12px",
              lineheight: "1",
              textAlign: "center",
            }}
            onClick={handleEdgeButtonClick} // Usa el manejador de eventos actualizado
          >
            +
          </button>
        </div>
      </EdgeLabelRenderer>
    </>
  );
}

// ...



  //fin micodigo

  return (
    <div className="dndflow" style={{ height: "100vh" }}>
      <ReactFlowProvider>
        <div className="reactflow-wrapper" ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            fitView
            nodeTypes={nodeTypes}
            edgeTypes={edgeTypes}
          >
            <Controls />
          </ReactFlow>
        </div>
        <Sidebar />
      </ReactFlowProvider>
    </div>
  );
};

export default DnDFlow;
