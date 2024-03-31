const { createGraph, addEdgeByLabels } = require("./graphModel");

// Step 1: Generate random distances between cities
function generateRandomDistances() {
  let graph = createGraph();
  let vertices = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];

  for (let i = 1; i < vertices.length; i++) {
    for (let j = 0; j < i; j++) {
      addEdgeByLabels(
        graph,
        vertices[i],
        vertices[j],
        Math.floor(Math.random() * 45) + 5
      );
    }
  }

  return graph;
}

function startGame() {
  // Generate random distances between cities
  let graph = generateRandomDistances();

  // Choose a random source city
  let sourceCity = Object.keys(graph)[Math.floor(Math.random() * 10)]; // Choose a random city from the graph

  // Choose a random destination city
  let destinationCity = Object.keys(graph)[Math.floor(Math.random() * 10)]; // Choose a random city from the graph

  // Source city should not be the same as destination city
  while (sourceCity === destinationCity) {
    destinationCity = Object.keys(graph)[Math.floor(Math.random() * 10)]; // Choose a random city from the graph
  }

  delete graph[sourceCity][destinationCity];
  delete graph[destinationCity][sourceCity];

  let vertices = Object.keys(graph);

  // for (let i = 0; i < vertices.length; i++) {
  //   for (let j = 0; j < i; j++) {
  //     if (Math.random() < 0.7 && Object.keys(graph[vertices[i]]).length > 1) {
  //       delete graph[vertices[i]][vertices[j]];
  //       delete graph[vertices[j]][vertices[i]];
  //     }
  //   }
  // }

  return {
    graph,
    sourceCity,
    destinationCity,
  };
}

// Step 2: Implement Dijkstra's algorithm
function dijkstra(graph, sourceCity) {
  // Implement Dijkstra's algorithm to find shortest path and distance from sourceCity to all other cities
}

// Step 3: Implement Bellman-Ford algorithm
function bellmanFord(graph, sourceCity) {
  // Implement Bellman-Ford algorithm to find shortest path and distance from sourceCity to all other cities
}

// Step 4: Create user interface for game player to provide answers

// Step 5: Verify user's response using Dijkstra's and Bellman-Ford algorithms

// Step 6: Record algorithm duration in database

// Step 7: Save correct answers in database

// Step 8: Write unit tests for implemented algorithms

module.exports = { startGame };
