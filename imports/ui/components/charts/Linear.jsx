import React from 'react';
import d3 from 'd3';
import XYAxis from './XYAxis.jsx';

const xMax = (data) => d3.max(data, (d) => d.year);
const xMin = (data) => d3.min(data, (d) => d.year);
const yMax = (data) => d3.max(data, (d) => d.sale);
const yMin = (data) => d3.min(data, (d) => d.sale);

const xScale = (props) => {
  // console.log('source:', props.data);
  console.log('xmax:', xMax(props.data));
  console.log('xmin:', xMin(props.data));

  return d3.scaleLinear()
    .domain([xMin(props.data), xMax(props.data)])
    .range([props.padding, props.width - props.padding * 2]);
};

const yScale = (props) => {
  // console.log('source:', props.data);
  console.log('ymax:', yMax(props.data));
  console.log('ymin:', yMin(props.data));
  return d3.scaleLinear()
    .domain([yMin(props.data), yMax(props.data)])
    .range([props.height - props.padding, props.padding]);
};

export default(props) => {
  const scales = { xScale: xScale(props), yScale: yScale(props) };
  return (
    <svg width={props.width} height={props.height}>
      <XYAxis {...props} {...scales} />
    </svg>
  );
};
