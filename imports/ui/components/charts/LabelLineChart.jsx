import React, { Component } from 'react';
import
  { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend }
  from 'recharts';

const data = [
      { name: '0', uv: 4000, pv: 2400, amt: 2400 },
      { name: '1', uv: 3000, pv: 1398, amt: 2210 },
      { name: '2', uv: 2000, pv: 9800, amt: 2290 },
      { name: '3', uv: 2780, pv: 3908, amt: 2000 },
      { name: '4', uv: 1890, pv: 4800, amt: 2181 },
      { name: '5', uv: 2390, pv: 3800, amt: 2500 },
      { name: '6', uv: 3490, pv: 4300, amt: 2100 },
];

class CustomizedLabel extends Component {
  render() {
    const { x, y, stroke, payload } = this.props;
    return (
      <text
        x={x} y={y} dy={-4}
        fill={stroke} fontSize={10} textAnchor="middle"
      >{payload.value}</text>);
  }
}

CustomizedLabel.propTypes = {
  x: React.PropTypes.number,
  y: React.PropTypes.number,
  stroke: React.PropTypes.string,
  payload: React.PropTypes.object,
};

class CustomizedAxisTick extends Component {
  render() {
    const { x, y, stroke, payload } = this.props;
    return (
      <g transform={`translate(${x},${y})`}>
        <text
          x={0} y={0} dy={16}
          textAnchor="end" fill="#666"
        >{payload.value}</text>
      </g>
    );
  }
}

CustomizedAxisTick.propTypes = {
  x: React.PropTypes.number,
  y: React.PropTypes.number,
  stroke: React.PropTypes.string,
  payload: React.PropTypes.object,
};

export default class LabelLineChart extends Component {
  render() {
    return (
      <LineChart
        width={600} height={300} data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
      >
        <XAxis dataKey="name" height={60} tick={<CustomizedAxisTick />} />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="pv" stroke="#8884d8" label={<CustomizedLabel />} />
        <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
      </LineChart>
    );
  }
}
