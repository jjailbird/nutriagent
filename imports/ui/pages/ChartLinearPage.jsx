import React, { Component } from 'react';
import Divider from 'material-ui/Divider';
import Title from 'react-title-component';

import styles from '../css/default.js';
import ChartLinear from '../components/charts/Linear.jsx';

styles.chart = {
  width: 500,
  height: 300,
  padding: 30,
};

const data = [
  {
    sale: 202,
    year: 2000,
  },
  {
    sale: 215,
    year: 2001,
  },
  {
    sale: 179,
    year: 2002,
  },
  {
    sale: 199,
    year: 2003,
  },
  {
    sale: 134,
    year: 2003,
  },
  {
    sale: 176,
    year: 2010,
  },
];

export default class ChartLinearPage extends Component {
  /*
  componentWillMount() {
    const script = document.createElement('script');

    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.6/d3.min.js';
    script.async = true;

    document.body.appendChild(script);
  }
  */
  render() {
    return (
      <div style={styles.root}>
        <Title render={(previousTitle) => `CHART Linear - ${previousTitle}`} />
        <h2>Chart Linear</h2>
        <Divider />
        <ChartLinear data={data} {...styles.chart} />
      </div>
    );
  }
}
