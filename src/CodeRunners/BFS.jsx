import React from "react";
import GraphCanvas from "../components/GraphCanvas";
import { useGraph } from "../Context/GraphContext";

export default function BFS() {
  const {
    currentNode,
    setCurrentNode,
    highlightedPath,
    setHighlightedPath,
    setNeighbours,
    matrix,
    nodes,
  } = useGraph();

  const startNode = 0;
  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  async function startBFS() {
    const visited = Array(nodes.length).fill(false);
    const queue = [];

    queue.push(startNode);
    visited[startNode] = true;
    setHighlightedPath([]);
    setNeighbours([]);

    while (queue.length > 0) {
      const curr = queue.shift();
      setCurrentNode(curr);
      setNeighbours([]);

      await sleep(1000);

      const newNeighbours = [];
      for (let i = 0; i < matrix[curr].length; i++) {
        if (matrix[curr][i] > 0 && !visited[i]) {
          queue.push(i);
          visited[i] = true;
          newNeighbours.push(i);

          setHighlightedPath(prev => [...prev, { source: curr, target: i }]);
        }
      }

      setNeighbours(newNeighbours);
      await sleep(1000);
    }

    setCurrentNode(null);
    setNeighbours([]);
  }

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center gap-6">
      <button
        onClick={startBFS}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
      >
        Start BFS
      </button>
      <GraphCanvas />
    </div>
  );
}
