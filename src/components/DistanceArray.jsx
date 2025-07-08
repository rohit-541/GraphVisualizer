import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

export default function DistanceArrayView({ distances }) {
  const svgRef = useRef();

  useEffect(() => {
    const width = 60;
    const height = 40;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const g = svg
      .attr("width", distances.length * (width + 10))
      .attr("height", height + 40)
      .append("g")
      .attr("transform", "translate(10, 10)");

    const nodes = g
      .selectAll("g")
      .data(distances)
      .enter()
      .append("g")
      .attr("transform", (d, i) => `translate(${i * (width + 10)}, 0)`);

    nodes
      .append("rect")
      .attr("width", width)
      .attr("height", height)
      .attr("rx", 6)
      .attr("ry", 6)
      .attr("fill", "#4ade80")
      .attr("stroke", "#065f46")
      .attr("stroke-width", 2);

    nodes
      .append("text")
      .attr("x", width / 2)
      .attr("y", height / 2 + 5)
      .attr("text-anchor", "middle")
      .attr("fill", "black")
      .style("font-size", "14px")
      .text((d) => (d === Infinity ? "∞" : d));
  }, [distances]);

  return <svg ref={svgRef}></svg>;
}
