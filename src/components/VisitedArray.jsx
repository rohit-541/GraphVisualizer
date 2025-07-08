import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

export default function VisitedArrayView({ visited, currentNode }) {
  const svgRef = useRef();

  useEffect(() => {
    const boxWidth = 40;
    const boxHeight = 40;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove(); // Clear before re-render

    const g = svg
      .attr("width", visited.length * (boxWidth + 10))
      .attr("height", boxHeight + 40)
      .append("g")
      .attr("transform", "translate(10, 10)");

    const nodes = g
      .selectAll("g")
      .data(visited)
      .enter()
      .append("g")
      .attr("transform", (d, i) => `translate(${i * (boxWidth + 10)}, 0)`);

    nodes
      .append("rect")
      .attr("width", boxWidth)
      .attr("height", boxHeight)
      .attr("rx", 6)
      .attr("ry", 6)
      .attr("fill", (d, i) =>
        i === currentNode ? "#8b5cf6" : d ? "#facc15" : "#e5e7eb"
      )
      .attr("stroke", "#111827")
      .attr("stroke-width", 1.5);

    nodes
      .append("text")
      .attr("x", boxWidth / 2)
      .attr("y", boxHeight / 2 + 5)
      .attr("text-anchor", "middle")
      .attr("fill", "#111827")
      .style("font-size", "14px")
      .text((_, i) => i);
  }, [visited, currentNode]);

  return <svg ref={svgRef}></svg>;
}
