import React from 'react';
import Divider from 'material-ui/Divider';
import Title from 'react-title-component';
import styles from '../css/default';

class Home extends React.Component {
  render() {
    return (
      <div style={styles.root}>
        <Title render={(previousTitle) => `HOME - ${previousTitle}`} />
        <h2>Home</h2>
        <Divider />
      </div>
    );
  }
}

export default Home;
