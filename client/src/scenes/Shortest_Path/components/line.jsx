import React from "react";

const Line = ({ x1, y1, x2, y2 }) => {
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <svg height={"90vh"}>
        <line
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          style={{ stroke: "black", strokeWidth: 2 }}
        />
        <circle cx={x1} cy={y1} r={5} fill="red" />
        <circle cx={x2} cy={y2} r={5} fill="red" />
      </svg>
    </div>
  );
};

export default Line;
