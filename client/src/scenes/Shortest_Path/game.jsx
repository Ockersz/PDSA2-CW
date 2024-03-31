import { Box, Button, Stack } from "@mui/material";
import axios from "axios";
import { useState } from "react";

const ShortestPath = () => {
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [weightedGraph, setWeightedGraph] = useState({});
  const [selectedVertex, setSelectedVertex] = useState(null);
  const [showAllLines, setShowAllLines] = useState(true);
  const [sourceVertex, setSourceVertex] = useState(null);
  const [destinationVertex, setDestinationVertex] = useState(null);

  const handleCircleClick = (vertex) => {
    setSelectedVertex(selectedVertex === vertex ? null : vertex);
  };

  const handleShowAllLines = () => {
    setShowAllLines(true);
    setSelectedVertex(null);
  };

  const handleShowSpecificLines = () => {
    setShowAllLines(false);
    setSelectedVertex(null);
  };

  const startGame = async () => {
    setIsGameStarted(true);
    axios
      .get("shortestPath/startgame")
      .then((res) => {
        setWeightedGraph(res.data.graph);
        setDestinationVertex(res.data.destinationCity);
        setSourceVertex(res.data.sourceCity);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const stopGame = async () => {
    setIsGameStarted(false);
    setWeightedGraph({});
  };

  const calculateVertexPositions = (radius, numVertices) => {
    const positions = [];
    const angleIncrement = (2 * Math.PI) / numVertices;
    for (let i = 0; i < numVertices; i++) {
      const x = (radius + i * 35) * Math.cos(i * angleIncrement);
      const y = (radius + i * 35) * Math.sin(i * angleIncrement);
      positions.push({ name: String.fromCharCode(65 + i), x, y });
    }
    return positions;
  };

  const vertexPositions = calculateVertexPositions(200, 10);

  return (
    <Box p={1}>
      <Box display={"grid"} gridTemplateColumns="repeat(4, 1fr)" gap={1}>
        <Box
          gridColumn={"span 1"}
          height={"90vh"}
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderRadius={2}
          sx={{
            backgroundColor: "#f3f4f6",
            boxShadow: "0 2px 4px 0 rgba(0,0,0,0.2)",
          }}
        >
          <Stack
            direction="column"
            justifyContent="center"
            alignItems="stretch"
            spacing={3}
          >
            <Button
              variant="outlined"
              color="primary"
              disabled={isGameStarted}
              onClick={startGame}
            >
              Start
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              disabled={!isGameStarted}
              onClick={stopGame}
            >
              Stop
            </Button>
          </Stack>
        </Box>

        <Box
          gridColumn={"span 3"}
          borderRadius={2}
          height={"90vh"}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Box
            display={"grid"}
            gridTemplateRows="repeat(5, 1fr)"
            gap={1}
            width="100%"
            height="100%"
          >
            <Box
              gridRow={"span 1"}
              borderRadius={2}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Box
                display={"grid"}
                gridTemplateColumns="repeat(5, 1fr)"
                gap={1}
                width="100%"
                height="100%"
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Box
                  gridColumn={"span 1"}
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                  Source City: {sourceVertex}
                </Box>
                <Box
                  gridColumn={"span 1"}
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                  Destination City: {destinationVertex}
                </Box>
              </Box>
            </Box>
            <Box
              gridRow={"span 4"}
              borderRadius={2}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Box
                display={"grid"}
                gridTemplateColumns="repeat(4, 1fr)"
                gap={1}
                width="100%"
                height="100%"
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Box gridColumn={"span 3"} textAlign="center">
                  <svg width="70%" height="70%" viewBox="-400 -500 900 900">
                    {Object.entries(weightedGraph).map(([vertex, edges]) =>
                      Object.entries(edges).map(([connectedVertex, weight]) => {
                        const isSelected =
                          vertex === selectedVertex ||
                          connectedVertex === selectedVertex;
                        const shouldShowLine = showAllLines || isSelected;
                        return (
                          shouldShowLine && (
                            <g
                              key={`${vertex}-${connectedVertex}`}
                              style={{
                                display: shouldShowLine ? "block" : "none",
                              }}
                            >
                              <line
                                x1={
                                  vertexPositions.find((v) => v.name === vertex)
                                    .x
                                }
                                y1={
                                  vertexPositions.find((v) => v.name === vertex)
                                    .y
                                }
                                x2={
                                  vertexPositions.find(
                                    (v) => v.name === connectedVertex
                                  ).x
                                }
                                y2={
                                  vertexPositions.find(
                                    (v) => v.name === connectedVertex
                                  ).y
                                }
                                stroke={`#${Math.floor(
                                  Math.random() * 16777215
                                ).toString(16)}`}
                                strokeWidth={isSelected ? 3 : 2}
                                onMouseOver={(e) => {
                                  e.target.style.stroke = "red";
                                  e.target.style.strokeWidth = "3";
                                  const textElement = e.target.nextSibling;
                                  textElement.style.fontWeight = "bold";
                                  textElement.style.fill = "red";
                                  const allLines =
                                    document.querySelectorAll("line");
                                  allLines.forEach((line) => {
                                    if (line !== e.target) {
                                      line.style.display = "none";
                                      const correspondingText =
                                        line.nextSibling;
                                      correspondingText.style.display = "none";
                                    }
                                  });
                                }}
                                onMouseOut={(e) => {
                                  e.target.style.stroke = "black";
                                  e.target.style.strokeWidth = "1";
                                  const textElement = e.target.nextSibling;
                                  textElement.style.fontWeight = "normal";
                                  textElement.style.fill = "black";

                                  // Show all lines
                                  const allLines =
                                    document.querySelectorAll("line");
                                  allLines.forEach((line) => {
                                    line.style.display = "block";
                                    const correspondingText = line.nextSibling;
                                    correspondingText.style.display = "block";
                                  });
                                }}
                              />
                              <text
                                x={
                                  (vertexPositions.find(
                                    (v) => v.name === vertex
                                  ).x +
                                    vertexPositions.find(
                                      (v) => v.name === connectedVertex
                                    ).x) /
                                    2 -
                                  5
                                }
                                y={
                                  (vertexPositions.find(
                                    (v) => v.name === vertex
                                  ).y +
                                    vertexPositions.find(
                                      (v) => v.name === connectedVertex
                                    ).y) /
                                  2
                                }
                                textAnchor="middle"
                                fill="black"
                                dy={
                                  // Calculate dynamic vertical offset based on vertex positions
                                  vertexPositions.find((v) => v.name === vertex)
                                    .y <
                                  vertexPositions.find(
                                    (v) => v.name === connectedVertex
                                  ).y
                                    ? 5
                                    : -5
                                }
                                dx={
                                  // Calculate dynamic horizontal offset based on vertex positions
                                  vertexPositions.find((v) => v.name === vertex)
                                    .x <
                                  vertexPositions.find(
                                    (v) => v.name === connectedVertex
                                  ).x
                                    ? -5
                                    : 15
                                }
                              >
                                {weight}
                              </text>
                            </g>
                          )
                        );
                      })
                    )}

                    {Object.keys(weightedGraph).map((vertex, index) => (
                      <g key={vertex}>
                        <circle
                          cx={vertexPositions[index].x}
                          cy={vertexPositions[index].y}
                          r={20}
                          fill="cyan"
                          onClick={() => handleCircleClick(vertex)}
                        />
                        <text
                          x={vertexPositions[index].x}
                          y={vertexPositions[index].y + 5} // Adjust vertical position to center text
                          textAnchor="middle"
                          fill="black"
                          onClick={() => handleCircleClick(vertex)}
                        >
                          {vertex}
                        </text>
                      </g>
                    ))}
                  </svg>
                  <Box gridColumn={"span 4"} textAlign="center">
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={handleShowAllLines}
                    >
                      Show All Lines
                    </Button>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={handleShowSpecificLines}
                    >
                      Show Specific Lines
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ShortestPath;
