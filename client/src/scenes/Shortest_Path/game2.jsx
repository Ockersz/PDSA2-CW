import React, { useState } from "react";
import { Box, Button, Card, Typography } from "@mui/material";
import axios from "axios";
import styled from "@emotion/styled";

import Edge from "./components/Edge";
import Node from "./components/Node";

const Container = styled(Box)({
  display: "flex",
  height: "100vh",
});

const Sidebar = styled(Card)({
  flex: "1",
  margin: "10px",
  maxWidth: "25%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "space-around",
  padding: "10px",
});

const MainContent = styled(Box)({
  flex: "3",
  margin: "10px",
  display: "flex",
  flexDirection: "column",
});

const TopText = styled(Card)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "20px",
  padding: "10px",
});

const SvgContainer = styled(Box)({
  flexGrow: 1,
  backgroundColor: "#f0f0f0",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const InfoBox = styled(Box)({
  border: "1px solid #000000",
  padding: "10px",
  borderRadius: "4px",
  margin: "20px",
});

function ShortestPath() {
  const [start, setStart] = useState("X");
  const [destination, setDestination] = useState("Y");
  const [highlightedEdges, setHighlightedEdges] = useState(new Set());
  const [hoveredNode, setHoveredNode] = useState(null);
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [graphLoaded, setGraphLoaded] = useState(false);
  const [selectedPath, setSelectedPath] = useState([]);
  const [totalDistance, setTotalDistance] = useState(0);

  const fetchGraphData = async () => {
    try {
      const response = await axios.get("shortestPath/startgame");
      const data = response.data;

      const nodes = Object.keys(data.graph).map((key) => ({ id: key }));
      const edges = [];

      Object.entries(data.graph).forEach(([node, connections]) => {
        Object.entries(connections).forEach(([connection, length]) => {
          edges.push({ from: node, to: connection, length });
        });
      });

      return {
        nodes,
        edges,
        sourceCity: data.sourceCity,
        destinationCity: data.destinationCity,
      };
    } catch (error) {
      console.error("Error fetching graph data:", error);
      return { nodes: [], edges: [], sourceCity: "", destinationCity: "" };
    }
  };

  const positionNodes = (nodesData) => {
    // Simple logic to position nodes in a polygon-like shape with random variations
    const radius = 300;
    const center = { x: 400, y: 400 };
    const angleStep = (2 * Math.PI) / nodesData.length;

    const positionedNodes = nodesData.map((node, index) => {
      const angle = angleStep * index;
      return {
        ...node,
        x:
          center.x +
          radius * Math.cos(angle) +
          (Math.random() - 0.5) * radius * 0.4,
        y:
          center.y +
          radius * Math.sin(angle) +
          (Math.random() - 0.5) * radius * 0.4,
      };
    });
    setNodes(positionedNodes);
  };

  const handleStart = async () => {
    const { nodes, edges, sourceCity, destinationCity } =
      await fetchGraphData();
    positionNodes(nodes);
    setEdges(edges);
    setStart(sourceCity);
    setDestination(destinationCity);
    setGraphLoaded(true);
    setSelectedPath([sourceCity]);
    setTotalDistance(0);
  };

  const handleNodeMouseEnter = (nodeId) => {
    const connectedEdges = new Set();
    edges.forEach((edge, index) => {
      if (edge.from === nodeId || edge.to === nodeId) {
        connectedEdges.add(index);
      }
    });
    setHighlightedEdges(connectedEdges);
    setHoveredNode(nodeId);
  };

  const handleNodeMouseLeave = () => {
    setHighlightedEdges(new Set());
    setHoveredNode(null);
  };

  const handleEdgeMouseEnter = (index) => {
    setHighlightedEdges(new Set([index]));
  };

  const handleEdgeMouseLeave = () => {
    setHighlightedEdges(new Set());
  };

  const handleEnd = () => {
    // Reset state
    setStart("?");
    setDestination("?");
    setHighlightedEdges(new Set());
    setHoveredNode(null);
    setNodes([]);
    setEdges([]);
    setGraphLoaded(false);
    setSelectedPath([]);
    setTotalDistance(0);
  };

  const calculateTotalDistance = (path) => {
    let distance = 0;
    for (let i = 0; i < path.length - 1; i++) {
      const edge = edges.find(
        (e) =>
          (e.from === path[i] && e.to === path[i + 1]) ||
          (e.to === path[i] && e.from === path[i + 1])
      );
      if (edge) {
        distance += edge.length;
      }
    }
    setTotalDistance(distance);
  };

  const handleNodeClick = (nodeId) => {
    const newPath = [...selectedPath];
    const lastIndex = newPath.length - 1;

    if (newPath.includes(nodeId)) {
      // Remove node if it's the last in the path
      if (newPath[lastIndex] === nodeId  && nodeId !== start) {
        newPath.pop();
      }
    } else {
      // Add node if adjacent to the last node in the path or if the path is empty
      if (
        lastIndex === -1 ||
        edges.some(
          (edge) =>
            (edge.from === newPath[lastIndex] && edge.to === nodeId) ||
            (edge.to === newPath[lastIndex] && edge.from === nodeId)
        )
      ) {
        newPath.push(nodeId);
      }
    }

    setSelectedPath(newPath);
    calculateTotalDistance(newPath);
  };

  const handleReset = () => {
    setSelectedPath([start]);
    setTotalDistance(0);
  };

  return (
    <Container>
      <Sidebar>
        <Box
          display="flex"
          justifyContent="center"
          width="100%"
          marginBottom="20px"
        >
          <Button
            variant="contained"
            color="primary"
            onClick={handleStart}
            style={{ margin: "20px" }}
          >
            New Game
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleEnd}
            style={{ margin: "20px" }}
          >
            End Game
          </Button>
        </Box>

        <Box>
          <InfoBox>
            <Typography variant="body1">
              Path: {selectedPath.join(" -> ")}
            </Typography>
          </InfoBox>
          <InfoBox>
            <Typography variant="body1">
              Path Length: {totalDistance}
            </Typography>
          </InfoBox>
        </Box>

        <Button variant="contained" color="secondary" onClick={handleReset} >
          Reset
        </Button>
      </Sidebar>

      <MainContent>
        <TopText>
          <Typography variant="h6">Shortest Path Game</Typography>
          <Box display="flex" alignItems="center">
            <Typography
              variant="h6"
              style={{ color: "darkgreen", marginRight: "10px" }}
            >
              Start: {start}
            </Typography>
            <Typography variant="h6" style={{ color: "darkred" }}>
              Destination: {destination}
            </Typography>
          </Box>
        </TopText>

        <SvgContainer>
          {graphLoaded && (
            <svg width="800" height="800" viewBox="0 0 800 800">
              {edges.map((edge, index) => (
                <Edge
                  key={index}
                  index={index}
                  x1={nodes.find((n) => n.id === edge.from).x}
                  y1={nodes.find((n) => n.id === edge.from).y}
                  x2={nodes.find((n) => n.id === edge.to).x}
                  y2={nodes.find((n) => n.id === edge.to).y}
                  length={edge.length}
                  onMouseEnter={() => handleEdgeMouseEnter(index)}
                  onMouseLeave={handleEdgeMouseLeave}
                  isInPath={selectedPath.includes(edge.from) && selectedPath.includes(edge.to) && Math.abs(selectedPath.indexOf(edge.from) - selectedPath.indexOf(edge.to)) === 1}
                  highlightedEdges={highlightedEdges}
                />
              ))}
              {nodes.map((node) => (
                <Node
                  key={node.id}
                  x={node.x}
                  y={node.y}
                  text={node.id}
                  type={
                    node.id === start
                      ? "start"
                      : node.id === destination
                      ? "end"
                      : "default"
                  }
                  onMouseEnter={() => handleNodeMouseEnter(node.id)}
                  onMouseLeave={handleNodeMouseLeave}
                  onClick={() => handleNodeClick(node.id)}
                  isHovered={hoveredNode === node.id}
                  isInPath={selectedPath.includes(node.id)}
                />
              ))}
            </svg>
          )}
        </SvgContainer>
      </MainContent>
    </Container>
  );
}

export default ShortestPath;
