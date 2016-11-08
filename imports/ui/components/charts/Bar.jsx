import React, { Component } from 'react';
import { BarChart } from 'react-d3';

const barData = [
  {
    name: 'Series A',
    values: [
      { x: 1, y: 91 },
      { x: 2, y: 90 },
      { x: 3, y: 95 },
    ],
  },
];

export default class Bar extends Component {
  render() {
    return (
      <BarChart
        data={barData}
        width={500}
        height={200}
        fill={'#3182bd'}
        title="Bar Chart"
      />
    );
  }
}
