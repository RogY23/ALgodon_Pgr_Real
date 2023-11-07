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
        }}
      > Inicio <Handle
          type="source"
          position={Position.Bottom}          
          style={{background: "#555" }}
          isConnectable={isConnectable}
        />
      </div>
    </>
  );
});
