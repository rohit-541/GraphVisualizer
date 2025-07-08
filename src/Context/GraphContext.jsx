import { createContext, useContext, useState } from "react";

// Create the context
const GraphContext = createContext();

// Provider
export const GraphContextProvider = ({ children }) => {
  const [nodes, setNodes] = useState([]);
  const [matrix, setMatrix] = useState([]);
  const [distances, setDistances] = useState([]);
  const [currentNode, setCurrentNode] = useState(null);
  const [neighbours, setNeighbours] = useState([]);
  const [highlightedPath, setHighlightedPath] = useState([]);
  const [visited,setVisited] = useState(Array(nodes.length).fill(false));
  const [isCycle,setIsCycle] = useState(false);

  // Initialize new graph with random node positions
  const updateGraph = (count) => {
    const newNodes = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.floor(Math.random() * 700) + 50,
      y: Math.floor(Math.random() * 500) + 50,
    }));

    const newMatrix = Array(count)
      .fill(0)
      .map(() => Array(count).fill(0));

    setNodes(newNodes);
    setMatrix(newMatrix);
    setDistances(Array(count).fill(Infinity));
    setCurrentNode(null);
    setNeighbours([]);
    setHighlightedPath([]);
  };

  return (
    <GraphContext.Provider
      value={{
        nodes,
        setNodes,
        matrix,
        setMatrix,
        distances,
        setDistances,
        currentNode,
        setCurrentNode,
        neighbours,
        setNeighbours,
        highlightedPath,
        setHighlightedPath,
        updateGraph,
        isCycle,
        setIsCycle,
        visited,
        setVisited
      }}
    >
      {children}
    </GraphContext.Provider>
  );
};

// Hook
export const useGraph = () => useContext(GraphContext);
