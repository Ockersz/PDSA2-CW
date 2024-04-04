class Graph {
  constructor() {
    this.vertices = [];
    this.adjacencyList = {};
  }

  vertexWithMinDistance(distances, visited) {
    let minDistance = Infinity,
      minVertex = null;
    for (let vertex in distances) {
      let distance = distances[vertex];
      if (distance < minDistance && !visited.has(vertex)) {
        minDistance = distance;
        minVertex = vertex;
      }
    }
    return minVertex;
  }

  dijkstra(source, destination) {
    let distances = {},
      parents = {},
      visited = new Set();
    for (let i = 0; i < this.vertices.length; i++) {
      if (this.vertices[i] === source) {
        distances[source] = 0;
      } else {
        distances[this.vertices[i]] = Infinity;
      }
      parents[this.vertices[i]] = null;
    }

    let currVertex = this.vertexWithMinDistance(distances, visited);

    while (currVertex !== null) {
      if (currVertex === destination) {
        break; // Terminate if destination is reached
      }
      let distance = distances[currVertex],
        neighbors = this.adjacencyList[currVertex];
      for (let neighbor in neighbors) {
        let newDistance = distance + neighbors[neighbor];
        if (distances[neighbor] > newDistance) {
          distances[neighbor] = newDistance;
          parents[neighbor] = currVertex;
        }
      }
      visited.add(currVertex);
      currVertex = this.vertexWithMinDistance(distances, visited);
    }

    // Output shortest distance and path
    let path = [];
    let currentVertex = destination;
    while (currentVertex !== null) {
      path.unshift(currentVertex);
      currentVertex = parents[currentVertex];
    }

    if (distances[destination] === Infinity) {
      console.log("There is no path from", source, "to", destination);
      return null;
    } else {
      console.log(
        "Shortest distance from",
        source,
        "to",
        destination + ":",
        distances[destination]
      );
      console.log("Shortest path:", path.join(" -> "));

      return { distance: distances[destination], path };
    }
  }

  addVertex(vertex) {
    this.vertices.push(vertex);
    this.adjacencyList[vertex] = {};
  }

  addEdge(vertex1, vertex2, weight) {
    this.adjacencyList[vertex1][vertex2] = weight;
    this.adjacencyList[vertex2][vertex1] = weight;
  }

  changeWeight(vertex1, vertex2, weight) {
    this.adjacencyList[vertex1][vertex2] = weight;
    this.adjacencyList[vertex2][vertex1] = weight;
  }
}

function createGraph(graphData) {
  const graph = new Graph();
  for (let vertex in graphData) {
    graph.addVertex(vertex);
    for (let neighbor in graphData[vertex]) {
      graph.addEdge(vertex, neighbor, graphData[vertex][neighbor]);
    }
  }
  return graph;
}

function test(graph, source, destination) {
  const graphs = createGraph(graph);
  return graphs.dijkstra(source, destination);
}

module.exports = { test };
