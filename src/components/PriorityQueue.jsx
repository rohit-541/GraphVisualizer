import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

export default function PriorityQueueView({ pq }) {
  const svgRef = useRef();

  useEffect(() => {
    const boxWidth = 60;
    const boxHeight = 40;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const g = svg
      .attr("width", pq.length * (boxWidth + 10) + 40)
      .attr("height", boxHeight + 40)
      .append("g")
      .attr("transform", "translate(10, 10)");

    const items = g
      .selectAll("g")
      .data(pq)
      .enter()
      .append("g")
      .attr("transform", (d, i) => `translate(${i * (boxWidth + 10)}, 0)`);

    items
      .append("rect")
      .attr("width", boxWidth)
      .attr("height", boxHeight)
      .attr("rx", 6)
      .attr("ry", 6)
      .attr("fill", "#38bdf8")
      .attr("stroke", "#0c4a6e")
      .attr("stroke-width", 2);

    items
      .append("text")
      .attr("x", boxWidth / 2)
      .attr("y", boxHeight / 2 + 5)
      .attr("text-anchor", "middle")
      .attr("fill", "white")
      .style("font-size", "14px")
      .text(d => `N${d.node} (${d.dist})`);
  }, [pq]);

  return <svg ref={svgRef}></svg>;
}
