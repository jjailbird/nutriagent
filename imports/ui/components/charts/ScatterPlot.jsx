import React from 'react';
import d3 from 'd3';
import DataCircles from './data/circles.jsx';
import XYAxis from './XYAxis.jsx';

const xMax = (data) => d3.max(data, (d) => d[0]);
const yMax = (data) => d3.max(data, (d) => d[1]);

const xScale = (props) => (
  d3.scaleLinear()
    .domain([0, xMax(props.data)])
    .range([props.padding, props.width - props.padding * 2])
);

const yScale = (props) => (
  d3.scaleLinear()
    .domain([0, yMax(props.data)])
    .range([props.height - props.padding, props.padding])
);

export default(props) => {
  const scales = { xScale: xScale(props), yScale: yScale(props) };
  return (
    <svg width={props.width} height={props.height}>
      <DataCircles {...props} {...scales} />
      <XYAxis {...props} {...scales} />
    </svg>
  );
};
