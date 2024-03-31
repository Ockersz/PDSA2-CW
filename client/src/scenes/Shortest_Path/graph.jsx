import React from "react";
import Line from "./components/line";

const Graph = () => {
  const graph = {
    A: { B: 1, C: 4 },
    B: { A: 1, C: 2, D: 5 },
    C: { A: 4, B: 2, D: 1 },
    D: { B: 5, C: 1 },
  };

  return (
    <div style={{ height: "100%", position: "relative" }}>
      <Line x1={50} y1={50} x2={200} y2={250} />
      <Line x1={50} y1={50} x2={100} y2={150} />
    </div>
  );
};

export default Graph;
