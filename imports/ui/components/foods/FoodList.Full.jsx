import React, { Component } from 'react';
import
  { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn }
  from 'material-ui/Table';
// import MediaQuery from 'react-responsive';
import MediaQuery from 'react-responsive';

const styles = {
  rowDefault: {
    width: '50px',
    paddingLeft: '5px',
    paddingRight: '5px',
    textAlign: 'center',
  },
};

export default class FoodList extends Component {
  render() {
    const { fooddata } = this.props;
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHeaderColumn style={styles.rowDefault}>NUM</TableHeaderColumn>
            <TableHeaderColumn>이름</TableHeaderColumn>
            <TableHeaderColumn style={styles.rowDefault}>1회제공량<br />(g)</TableHeaderColumn>
            <TableHeaderColumn style={styles.rowDefault}>열량<br />(kcal)</TableHeaderColumn>
            {/*
            <MediaQuery orientation="landscape">
              <TableHeaderColumn style={styles.rowDefault}>탄수화물<br />(g)</TableHeaderColumn>
              <TableHeaderColumn style={styles.rowDefault}>단백질<br />(g)</TableHeaderColumn>
              <TableHeaderColumn style={styles.rowDefault}>지방<br />(g)</TableHeaderColumn>
              <TableHeaderColumn style={styles.rowDefault}>당류<br />(g)</TableHeaderColumn>
              <TableHeaderColumn style={styles.rowDefault}>나트륨<br />(mg)</TableHeaderColumn>
            </MediaQuery>
            */}
          </TableRow>
        </TableHeader>
        <TableBody>
        {fooddata.map((row, idx) => (
          <TableRow key={idx}>
            <TableRowColumn style={styles.rowDefault}>{row.NUM}</TableRowColumn>
            <TableRowColumn>{row.DESC_KOR}</TableRowColumn>
            <TableRowColumn style={styles.rowDefault}>{row.SERVING_WT}</TableRowColumn>
            <TableRowColumn style={styles.rowDefault}>{row.NUTR_CONT1}</TableRowColumn>
            {/*
            <MediaQuery orientation="landscape">
              <TableRowColumn style={styles.rowDefault}>{row.NUTR_CONT2}</TableRowColumn>
              <TableRowColumn style={styles.rowDefault}>{row.NUTR_CONT3}</TableRowColumn>
              <TableRowColumn style={styles.rowDefault}>{row.NUTR_CONT4}</TableRowColumn>
              <TableRowColumn style={styles.rowDefault}>{row.NUTR_CONT5}</TableRowColumn>
              <TableRowColumn style={styles.rowDefault}>{row.NUTR_CONT6}</TableRowColumn>
            </MediaQuery>
            */}
          </TableRow>
        ))}
        </TableBody>
      </Table>
    );
  }
}

FoodList.propTypes = {
  fooddata: React.PropTypes.array,
};
