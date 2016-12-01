import React, { Component } from 'react';
import Divider from 'material-ui/Divider';
import Title from 'react-title-component';
import styles from '../css/default.js';
import { Meteor } from 'meteor/meteor';
import { HTTP } from 'meteor/http';

import Echart from '../components/charts/Echart.jsx';

export default class EchartPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData1: [],
      chartData2: [],
    };
  }
  componentWillMount() {
    HTTP.get(Meteor.absoluteUrl('data/growth_charts_korea_2007_male.json'),
      (err, result) => {
        // console.log('load json type:', typeof result.data);
        // console.log('load json:', result.data);
        this.setState({ chartData1: result.data });
      }
    );
    HTTP.get(Meteor.absoluteUrl('data/growth_charts_korea_2007_female.json'),
      (err, result) => {
        // console.log('load json type:', typeof result.data);
        // console.log('load json:', result.data);
        this.setState({ chartData2: result.data });
      }
    );
  }
  render() {
    // console.log('this.state.chartData', this.state.chartData);
    return (
      <div style={styles.root}>
        <Title render={(previousTitle) => `ECHART - ${previousTitle}`} />
        <h2>ECharts</h2>
        <Divider />
        <Echart data1={this.state.chartData1} data2={this.state.chartData2} />
      </div>
    );
  }
}
