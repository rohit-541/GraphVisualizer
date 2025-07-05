import React, { useState } from "react";
import { useGraph } from "../Context/GraphContext";


export default function CreateGraph() {
  const [count, setCount] = useState(5);
  const [src, setSrc] = useState(0);
  const [tgt, setTgt] = useState(1);
  const [weight, setWeight] = useState(1);

  const { nodes, matrix, setMatrix, updateGraph } = useGraph();

  const handleCreateGraph = () => {
    if (count > 0) {
      updateGraph(count);
      setSrc(0);
      setTgt(1);
    }
  };

  const handleAddEdge = () => {
    if (src === tgt || weight <= 0) return;

    const newMatrix = matrix.map((row) => [...row]);
    newMatrix[src][tgt] = weight;
    newMatrix[tgt][src] = weight; // undirected
    setMatrix(newMatrix);
  };

  return (
    <div className="space-y-6">
      {/* Node creation */}
      <div className="flex items-center gap-4">
        <label htmlFor="node-count" className="font-medium">
          Number of Nodes:
        </label>
        <input
          id="node-count"
          type="number"
          min={1}
          value={count}
          onChange={(e) => setCount(parseInt(e.target.value) || 0)}
          className="border px-2 py-1 w-20"
        />
        <button
          onClick={handleCreateGraph}
          className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
        >
          Create Graph
        </button>
      </div>

      {/* Edge creation */}
      {nodes.length >= 2 && (
        <div className="flex flex-wrap gap-4 items-center">
          <label className="font-medium">Add Edge:</label>

          <select
            value={src}
            onChange={(e) => setSrc(parseInt(e.target.value))}
            className="border px-2 py-1"
          >
            {nodes.map((n) => (
              <option key={n.id} value={n.id}>
                Node {n.id}
              </option>
            ))}
          </select>

          <select
            value={tgt}
            onChange={(e) => setTgt(parseInt(e.target.value))}
            className="border px-2 py-1"
          >
            {nodes.map((n) => (
              <option key={n.id} value={n.id}>
                Node {n.id}
              </option>
            ))}
          </select>

          <input
            type="number"
            min={1}
            value={weight}
            onChange={(e) => setWeight(parseInt(e.target.value) || 1)}
            className="border px-2 py-1 w-20"
            placeholder="Weight"
          />

          <button
            onClick={handleAddEdge}
            className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
          >
            Add Edge
          </button>
        </div>
      )}
    </div>
  );
}
