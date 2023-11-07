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
import ConectorButton from "./NodosFiguras/ConectorButton";

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
    data: { label: "Inicio" },
    position: { x: 250, y: 5 },
  },
  {
    id: id2,
    type: "Fin",
    data: { label: "Salida" },
    position: { x: 250, y: 200 },
  },
];

const initialEdge = (id1, id2) => [
  {
    
    label: "no",
    type: ConectorButton,
    id: getId(),
    source: id1,
    target: id2,
  },
];

let id = 0;

const getId = () => `dndnode_${id++}`;

const DnDFlow = () => {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(
    initialNodes(getId(), getId())
  );
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdge(nodes[0].id, nodes[1].id));
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  );
  //micodigo

  //fin micodigo
  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData("application/reactflow");

      // check if the dropped element is valid
      if (typeof type === "undefined" || !type) {
        return;
      }

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      if (type === "Decision") {
        const node1 = {
          id: getId(),
          type: "Decision",
          position: { x: position.x, y: position.y },
          data: {},
        };
        const node2 = {
          id: getId(),
          type: "DecisionFin",
          position: { x: position.x, y: position.y + 100 },
          data: {},
        };

        const edgesi = {
          label: "si",
          type: "step",
          id: getId(),
          source: node1.id,
          sourceHandle: "a",
          target: node2.id,
          targetHandle: "a",
        };

        const edgeno = {
          label: "no",
          type: "step",
          id: getId(),
          source: node1.id,
          sourceHandle: "b",
          target: node2.id,
          targetHandle: "b",
        };

        setNodes((prev) => prev.concat([node1, node2]));
        setEdges((prev) => prev.concat([edgesi, edgeno]));

        return [node1, node2, edgesi, edgeno];
      }

      const newNode = {
        id: getId(),
        type,
        position,
        data: { label: `${type} node` },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance]
  );

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
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
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
