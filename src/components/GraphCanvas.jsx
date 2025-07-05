import { useEffect, useRef } from "react";
import * as d3 from "d3";
import { useGraph } from "../Context/GraphContext";

export default function GraphCanvas() {
  const svgRef = useRef();
  const {
    nodes,
    matrix,
    distances = [],
    currentNode,
    highlightedPath = [],
  } = useGraph();
  console.log(currentNode);
  useEffect(() => {
    if (nodes.length === 0) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    // Build edges from adjacency matrix
    const edges = [];
    for (let i = 0; i < matrix.length; i++) {
      for (let j = i + 1; j < matrix.length; j++) {
        if (matrix[i][j] > 0) {
          const isHighlighted = highlightedPath.some(
            e =>
              (e.source === i && e.target === j) ||
              (e.source === j && e.target === i)
          );
          edges.push({
            source: nodes[i],
            target: nodes[j],
            weight: matrix[i][j],
            highlighted: isHighlighted,
          });
        }
      }
    }

    // Groups
    const edgeGroup = svg.append("g");
    const weightGroup = svg.append("g");
    const nodeGroup = svg.append("g");

    // Render edges
    const edgeLines = edgeGroup
      .selectAll("line")
      .data(edges)
      .join("line")
      .attr("stroke", d => (d.highlighted ? "#facc15" : "#aaa"))
      .attr("stroke-width", 2);

    // Render edge weights with perpendicular offset
    const offset = 15;
    const weightLabels = weightGroup
      .selectAll("text")
      .data(edges)
      .join("text")
      .attr("fill", "black")
      .attr("font-size", 14)
      .attr("text-anchor", "middle")
      .text(d => d.weight);

    // Drag behavior
    const drag = d3.drag()
      .on("start", (event) => {
        event.sourceEvent.preventDefault();
      })
      .on("drag", (event, d) => {
        d.x = event.x;
        d.y = event.y;
        update();
      });

    // Node groups
    const nodeGroups = nodeGroup
      .selectAll("g")
      .data(nodes)
      .join("g")
      .call(drag);

    // Node circle
    nodeGroups
      .append("circle")
      .attr("r", 22)
      .attr("fill", d =>
        d.id === currentNode ? "#a855f7" : "#2563eb"
      )
      .attr("stroke", "#1e3a8a")
      .attr("stroke-width", 2);

    // Node ID
    nodeGroups
      .append("text")
      .attr("text-anchor", "middle")
      .attr("fill", "white")
      .attr("font-size", 14)
      .attr("font-weight", "bold")
      .attr("dy", 5)
      .text(d => d.id);

    // Distance label
    nodeGroups
      .append("text")
      .attr("text-anchor", "middle")
      .attr("fill", "#111")
      .attr("font-size", 11)
      .attr("dy", 35)
      .text(d =>
        distances[d.id] === undefined || distances[d.id] === Infinity
          ? "∞"
          : distances[d.id]
      );

    // Central update function
    function update() {
      nodeGroups.attr("transform", d => `translate(${d.x}, ${d.y})`);

      edgeLines
        .attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y);

      weightLabels
        .attr("x", d => {
          const mx = (d.source.x + d.target.x) / 2;
          const dx = d.target.x - d.source.x;
          const dy = d.target.y - d.source.y;
          const len = Math.sqrt(dx * dx + dy * dy);
          return mx - offset * (dy / len); // offset perpendicular to line
        })
        .attr("y", d => {
          const my = (d.source.y + d.target.y) / 2;
          const dx = d.target.x - d.source.x;
          const dy = d.target.y - d.source.y;
          const len = Math.sqrt(dx * dx + dy * dy);
          return my + offset * (dx / len);
        });
    }

    update(); // initial draw
  }, [nodes, matrix, distances, currentNode, highlightedPath]);

  return (
    <svg
      ref={svgRef}
      width={800}
      height={600}
      className="border rounded shadow select-none"
      style={{ background: "white", cursor: "grab", userSelect: "none" }}
    />
  );
}
