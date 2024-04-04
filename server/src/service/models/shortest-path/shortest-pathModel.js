const { createGraph, addEdgeByLabels } = require("./graphModel");
const { test } = require("./dijkstraTest");
const { json } = require("express");
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

async function saveSolution(source, destination, path, player, graph) {
  console.log("source", source);
  console.log("destination", destination);
  console.log("path", path);
  console.log("player", player);
  console.log("graph", graph);

  //const correctPath = findShortestPath(graph, source, destination);
  //console.log("correctPath", correctPath);
  const res = test(graph, source, destination);

  const correctPath = res.path;

  // Check if the player's path is correct
  let isCorrect = true;

  if (path.length !== correctPath.length) {
    isCorrect = false;
  }

  for (let i = 0; i < path.length; i++) {
    if (path[i] !== correctPath[i]) {
      isCorrect = false;
      break;
    }
  }
  console.log("isCorrect", isCorrect);

  return {
    correct: isCorrect,
    correctPath,
    playerPath: path,
  };
}

// class PriorityQueue {
//   constructor() {
//     this.queue = [];
//   }

//   enqueue(element, priority) {
//     this.queue.push({ element, priority });
//     this.sort();
//   }

//   dequeue() {
//     return this.queue.shift().element;
//   }

//   sort() {
//     this.queue.sort((a, b) => a.priority - b.priority);
//   }

//   isEmpty() {
//     return this.queue.length === 0;
//   }
// }

// // function dijkstra(graph, source) {
// //   const vertices = Object.keys(graph);
// //   const distances = {};
// //   const previous = {};
// //   const priorityQueue = new PriorityQueue();

// //   vertices.forEach((vertex) => {
// //     distances[vertex] = vertex === source ? 0 : Infinity;
// //     priorityQueue.enqueue(vertex, distances[vertex]);
// //     previous[vertex] = null;
// //   });

// //   while (!priorityQueue.isEmpty()) {
// //     const currentVertex = priorityQueue.dequeue();

// //     Object.keys(graph[currentVertex]).forEach((neighbor) => {
// //       const distance =
// //         distances[currentVertex] + graph[currentVertex][neighbor];
// //       if (distance < distances[neighbor]) {
// //         distances[neighbor] = distance;
// //         previous[neighbor] = currentVertex;
// //         priorityQueue.enqueue(neighbor, distance);
// //       }
// //     });
// //   }

// //   return { distances, previous };
// // }

// function shortestPath(graph, source, destination) {
//   const weightedGraph = convertGraphWeights(graph);
//   const { distances, previous } = dijkstra(weightedGraph, source);

//   const path = findShortestPath(previous, source, destination);
//   const distance = distances[destination];

//   return { path, distance };
// }

// function findShortestPath(previous, source, destination) {
//   const path = [destination];

//   while (path[path.length - 1] !== source) {
//     path.push(previous[path[path.length - 1]]);
//   }

//   path.reverse();

//   return path;
// }

// function convertGraphWeights(graph) {
//   const newGraph = {};

//   for (const vertex in graph) {
//     newGraph[vertex] = {};
//     for (const neighbor in graph[vertex]) {
//       newGraph[vertex][neighbor] = Number(graph[vertex][neighbor]);
//     }
//   }

//   return newGraph;
// }

// // Step 3: Implement Bellman-Ford algorithm
// function bellmanFord(graph, sourceCity) {
//   // Implement Bellman-Ford algorithm to find shortest path and distance from sourceCity to all other cities
// }

// // Step 5: Verify user's response using Dijkstra's and Bellman-Ford algorithms

// // Step 6: Record algorithm duration in database

// // Step 7: Save correct answers in database

// // Step 8: Write unit tests for implemented algorithms

module.exports = { startGame, saveSolution };
