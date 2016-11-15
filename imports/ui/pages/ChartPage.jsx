import React, { Component } from 'react';
import Divider from 'material-ui/Divider';
import Title from 'react-title-component';

import LabelLineChart from '../components/charts/LabelLineChart.jsx';

const styles = {
  root: {
    minHeight: '400px',
    textAlign: 'center',
    padding: '1em 2em',
  },
};

export default class ChartPage extends Component {
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
        <Title render={(previousTitle) => `CHART - ${previousTitle}`} />
        <h2>Custom Label Charts</h2>
        <Divider />
        <LabelLineChart />
      </div>
    );
  }
}
