import React, { useState } from "react";
import { createDirectedMatrix } from "../../helper-functions/helper-functions";

const ShortestPath = () => {
  const [distanceMatix, setDistanceMatrix] = useState(createDirectedMatrix(10));
  console.log(distanceMatix);

  return (
    <div>
      <h1>Shortest Path</h1>
    </div>
  );
};

export default ShortestPath;
