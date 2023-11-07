import React, { memo } from "react";
import { Handle, Position } from "reactflow";

export default memo(({ data, isConnectable }) => {
  return (
    <>
      <div
        style={{
          border: "1px solid black",
          padding: "10px",
          background: "white",
        }}
      >
        <Handle
          type="target"
          position={Position.Top}
          style={{ background: "#555" }}
          onConnect={(params) => console.log("handle onConnect", params)}
          isConnectable={isConnectable}
        />
        <p>decicion</p>
        <input type="text" onChange={data.onChange} defaultValue={""} />
        <Handle
          type="source"
          position={Position.Left}
          id="a"
          style={{ background: "#555" }}
          isConnectable={isConnectable}
        />
        <Handle
          type="source"
          position={Position.Right}
          id="b"
          style={{ background: "#555" }}
          isConnectable={isConnectable}
        />
      </div>
      
    </>
  );
});
