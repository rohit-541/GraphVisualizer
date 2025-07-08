import { useEffect, useRef } from "react";
import * as d3 from "d3";
import { useGraph } from "../Context/GraphContext";

export default function GraphCanvas() {
  const svgRef = useRef();
  const {
    nodes, matrix, distances = [],
    currentNode, highlightedPath = [], neighbours = []
  } = useGraph();

  useEffect(() => {
    if (nodes.length === 0) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const edges = [];
    for (let i = 0; i < matrix.length; i++) {
      for (let j = i + 1; j < matrix.length; j++) {
        if (matrix[i][j] > 0) {
          const isHighlighted = highlightedPath.some(
            e => (e.source === i && e.target === j) || (e.source === j && e.target === i)
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

    const edgeGroup = svg.append("g");
    const weightGroup = svg.append("g");
    const nodeGroup = svg.append("g");

    const edgeLines = edgeGroup
      .selectAll("line")
      .data(edges)
      .join("line")
      .attr("stroke", d => d.highlighted ? "#facc15" : "#aaa")
      .attr("stroke-width", 2);

    const weightLabels = weightGroup
      .selectAll("text")
      .data(edges)
      .join("text")
      .attr("fill", "black")
      .attr("font-size", 14)
      .attr("text-anchor", "middle")
      .text(d => d.weight);

    const drag = d3.drag()
      .on("start", (event) => event.sourceEvent.preventDefault())
      .on("drag", (event, d) => {
        d.x = event.x;
        d.y = event.y;
        update();
      });

    const nodeGroups = nodeGroup
      .selectAll("g")
      .data(nodes)
      .join("g")
      .call(drag);

    nodeGroups
      .append("circle")
      .attr("r", 22)
      .attr("fill", d => {
        if (d.id === currentNode) return "#a855f7";
        if (neighbours.includes(d.id)) return "#fb923c";
        if (highlightedPath.some(e => e.source === d.id || e.target === d.id)) return "#facc15";
        return "#2563eb";
      })
      .attr("stroke", "#1e3a8a")
      .attr("stroke-width", 2);

    nodeGroups
      .append("text")
      .attr("text-anchor", "middle")
      .attr("fill", "white")
      .attr("font-size", 14)
      .attr("font-weight", "bold")
      .attr("dy", 5)
      .text(d => d.id);

    function update() {
      nodeGroups.attr("transform", d => `translate(${d.x}, ${d.y})`);
      edgeLines
        .attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y);
      weightLabels
        .attr("x", d => (d.source.x + d.target.x) / 2 - 12)
        .attr("y", d => (d.source.y + d.target.y) / 2 + 12);
    }

    update();
  }, [nodes, matrix, distances, currentNode, highlightedPath, neighbours]);

  return (
    <svg
      ref={svgRef}
      width={900}
      height={600}
      className="border rounded shadow select-none bg-white"
      style={{ cursor: "grab" }}
    />
  );
}
