import React, { useState } from "react";
import { useGraph } from "../Context/GraphContext";

export default function CreateGraph() {
  const [count, setCount] = useState(5);
  const { updateGraph } = useGraph();

  const handleCreate = () => {
    if (count > 0) {
      updateGraph(count);
    }
  };

  return (
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
        onClick={handleCreate}
        className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
      >
        Create Graph
      </button>
    </div>
  );
}
