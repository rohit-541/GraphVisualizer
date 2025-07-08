import React from "react";
import GraphCanvas from "../components/GraphCanvas";
import { useGraph } from "../Context/GraphContext";

export default function CycleDetection() {
  const {
    currentNode,
    setCurrentNode,
    highlightedPath,
    setHighlightedPath,
    setNeighbours,
    matrix,
    nodes,
    setCycle
  } = useGraph();

  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  async function startCycleDetection() {
    const visited = Array(nodes.length).fill(false);
    const parent = Array(nodes.length).fill(-1);
    let foundCycle = false;
    let cycleEdges = [];

    async function dfs(u, par, path) {
      visited[u] = true;
      setCurrentNode(u);
      setNeighbours([]);

      await sleep(1000);

      for (let v = 0; v < matrix[u].length; v++) {
        if (matrix[u][v] > 0) {
          if (!visited[v]) {
            setNeighbours([v]);
            await sleep(1000);
            const result = await dfs(v, u, [...path, [u, v]]);
            if (result) return true;
          } else if (v !== par) {
            // Cycle detected: back edge
            foundCycle = true;

            // Reconstruct the cycle path
            const cycle = [...path, [u, v]];
            cycleEdges = cycle;
            return true;
          }
        }
      }

      return false;
    }

    setHighlightedPath([]);
    setNeighbours([]);
    setCurrentNode(null);

    for (let i = 0; i < nodes.length; i++) {
      if (!visited[i]) {
        if (await dfs(i, -1, [])) break;
      }
    }

    if (foundCycle) {
        setCycle(true);
      setHighlightedPath(cycleEdges.map(([u, v]) => ({ source: u, target: v })));
    }

    setCurrentNode(null);
    setNeighbours([]);
  }

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center gap-6">
      <button
        onClick={startCycleDetection}
        className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
      >
        Detect Cycle
      </button>
      <GraphCanvas />
    </div>
  );
}
