import React, { Component } from 'react';
import Divider from 'material-ui/Divider';
import Title from 'react-title-component';
import styles from '../css/default';
import TestChart from '../components/charts/Test.jsx';


export default class TestPage extends Component {
  render() {
    return (
      <div style={styles.root}>
        <Title render={(previousTitle) => `TEST - ${previousTitle}`} />
        <h2>FOOD Table</h2>
        <Divider />
        <TestChart />
      </div>
    );
  }
}
