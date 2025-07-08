import React, { useState } from "react";
import { useGraph } from "../Context/GraphContext";
import GraphCanvas from "../components/GraphCanvas";
import VisitedArrayView from "../components/VisitedArray";
import DistanceArrayView from "../components/DistanceArray";
import PriorityQueueView from "../components/PriorityQueue";

export default function Dijkstra() {
  const {
    matrix,
    nodes,
    setCurrentNode,
    setHighlightedPath,
    setNeighbours,
    setDistances,
    distances,
    setVisited,
    visited,
  } = useGraph();

  const [pqState, setPqState] = useState([]);

  const sleep = (ms) => new Promise((res) => setTimeout(res, ms));
  const startNode = 0;

  async function runDijkstra() {
    const n = nodes.length;
    const dist = Array(n).fill(Infinity);
    const visitedLocal = Array(n).fill(false);
    const pq = [];

    dist[startNode] = 0;
    pq.push({ node: startNode, dist: 0 });

    setDistances([...dist]);
    setVisited([...visitedLocal]);
    setHighlightedPath([]);
    setNeighbours([]);
    setPqState([...pq]);

    while (pq.length > 0) {
      pq.sort((a, b) => a.dist - b.dist);
      const { node: u } = pq.shift();
      setPqState([...pq]); // update after pop

      if (visitedLocal[u]) continue;

      visitedLocal[u] = true;
      setVisited([...visitedLocal]);
      setCurrentNode(u);
      await sleep(2000);

      const newNeighbours = [];
      for (let v = 0; v < matrix[u].length; v++) {
        if (matrix[u][v] > 0 && !visitedLocal[v]) {
          const weight = matrix[u][v];
          if (dist[u] + weight < dist[v]) {
            dist[v] = dist[u] + weight;
            pq.push({ node: v, dist: dist[v] });

            setHighlightedPath((prev) => [
              ...prev,
              { source: u, target: v },
            ]);
            setDistances([...dist]);
            newNeighbours.push(v);
            setPqState([...pq]); // update after push
            await sleep(1000);
          }
        }
      }

      setNeighbours(newNeighbours);
      await sleep(1000);
    }

    setCurrentNode(null);
    setNeighbours([]);
    setPqState([]);
  }

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center gap-6 p-6">
      <button
        onClick={runDijkstra}
        className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
      >
        Run Dijkstra
      </button>

      <PriorityQueueView pq={pqState} />
      <VisitedArrayView visited={visited} currentNode={null} />
      <DistanceArrayView distances={distances} />
      <GraphCanvas />
    </div>
  );
}
