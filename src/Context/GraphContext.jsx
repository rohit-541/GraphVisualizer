import { createContext, useContext, useState } from "react";

// Create the context
const GraphContext = createContext();

// GraphContext Provider component
export const GraphContextProvider = ({ children }) => {
  const [nodes, setNodes] = useState([]);
  const [matrix, setMatrix] = useState([]);

  // Update graph with random node positions
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
  };

  return (
    <GraphContext.Provider 
        value={{ 
            nodes,
            matrix, 
            setMatrix, 
            updateGraph 
        }}>
      {children}
    </GraphContext.Provider>
  );
};

// Custom hook to use the context
export const useGraph = () => useContext(GraphContext);
