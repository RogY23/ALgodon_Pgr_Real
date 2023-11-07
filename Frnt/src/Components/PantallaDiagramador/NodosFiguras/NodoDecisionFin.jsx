import React, { memo } from "react";
import { Handle, Position } from "reactflow";

export default memo(({ isConnectable }) => {
  return (
    <>
      <div
        style={{
          border: "1px solid black",
          padding: "10px",
          background: "white",
          borderRadius: "50%",
        }}
      >
        <Handle
          type="target"
          position={Position.Left}
          id="a"
          style={{ background: "#555" }}
          onConnect={(params) => console.log("handle onConnect", params)}
          isConnectable={isConnectable}
        />
        <Handle
          type="target"
          position={Position.Right}
          id="b"
          style={{ background: "#555" }}
          onConnect={(params) => console.log("handle onConnect", params)}
          isConnectable={isConnectable}
        />
        x
        <Handle
          type="source"
          position={Position.Bottom}
          
          style={{ background: "#555" }}
          isConnectable={isConnectable}
        />
      </div>
    </>
  );
});
