import React, { useCallback, useState } from "react";
import ReactFlow, {
  Background,
  Controls,
  addEdge,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from "reactflow";
import NodoInicio from "./NodosFiguras/NodoInicio";
import Nodofin from "./NodosFiguras/Nodofin";
import NodoEntrada from "./NodosFiguras/NodoEntrada";
import {
  Box,
  Button,
  Divider,
  Grid,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from "@mui/material";
import { grid } from "@mui/system";

//generador de ids
let idN = 0;
const getIdN = () => `Node_${idN++}`;
let idE = 0;
const getIdE = () => `Edge_${idE++}`;

//iniciar tipos
const nodeTypes = {
  NodoInicio: NodoInicio,
  Nodofin: Nodofin,
  NodoEntrada: NodoEntrada,
};

//Nodos y conectores iniciales

const initialNodes = [
  {
    id: "NodeIni",
    type: "NodoInicio",
    position: { x: 125, y: 0 },
  },
  {
    id: "NodeFin",
    type: "Nodofin",
    position: { x: 125, y: 200 },
  },
];

const initialEdges = [
  {
    type: "smoothstep",
    id: "edgeinifin",
    source: "NodeIni",
    target: "NodeFin",
  },
];

function FlowDiagram() {
  // Componente Principal
  const { project } = useReactFlow();
  // arrays de los nodos y conectores
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  const NewNodo = (xp, yp) => {
    return {
      id: getIdN(),
      type: "NodoEntrada",
      position: project({
        x: xp - 100,
        y: yp - 75,
      }),
    };
  };

  const NewEdge = (sou, tar) => [
    {
      // Plantillas de Conectores
      type: "smoothstep",
      id: getIdE(),
      source: sou,
      target: tar,
    },
  ];

  const insertarNodo = (edge, x, y) => {
    const NodoN = NewNodo(x, y);
    const sourceN = edge.source;
    const targetN = edge.target;

    const EdgeN1 = NewEdge(sourceN, NodoN.id);
    const EdgeN2 = NewEdge(NodoN.id, targetN);

    setNodes((nodo) => nodo.concat(NodoN));
    setEdges((edge) => edge.concat(EdgeN1));
    setEdges((edge) => edge.concat(EdgeN2));

    setEdges((els) => els.filter((e) => e.id !== edge.id));
  };

  const onEdgeClick = useCallback(evt, edge) => {
    insertarNodo(edge, evt.clientX, evt.clientY);
    console.log(evt);
  };

  const [selectedIndex, setSelectedIndex] = useState("entrada");
  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };
  return (
    <div style={{ height: "100vh" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        defaultNodes={initialNodes}
        defaultEdges={initialEdges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onEdgeClick={onEdgeClick}
      >
        <Background variant="dots" />
        <Controls />

        <Box sx={{ width: "20vh", maxWidth: 360, bgcolor: "background.paper" }}>
          <List component="nav" aria-label="main mailbox folders">
            <ListItemButton
              selected={selectedIndex === "entrada"}
              onClick={(event) => handleListItemClick(event, "entrada")}
            >
              <ListItemText primary="entrada" />
            </ListItemButton>

            <ListItemButton
              selected={selectedIndex === "proceso"}
              onClick={(event) => handleListItemClick(event, "proceso")}
            >
              <ListItemText primary="Proceso" />
            </ListItemButton>

            <ListItemButton
              selected={selectedIndex === "salida"}
              onClick={(event) => handleListItemClick(event, "salida")}
            >
              <ListItemText primary="Salida" />
            </ListItemButton>
          </List>
        </Box>
      </ReactFlow>
    </div>
  );
}

export default FlowDiagram;
