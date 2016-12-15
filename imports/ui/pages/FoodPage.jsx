import React, { Component } from 'react';
import Divider from 'material-ui/Divider';
import Title from 'react-title-component';
import styles from '../css/default';

import FoodNameAuto from '../components/foods/FoodNameAuto.jsx';
import FoodList from '../components/foods/FoodList.jsx';
import Paging from '../components/Pagination.jsx';
import SearchIcon from 'material-ui/svg-icons/action/search';
import Chip from 'material-ui/Chip';
import Avatar from 'material-ui/Avatar';

const dataSource1 = ['12345', '23456', '34567'];

export default class FoodPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
    };
    this.onPageChange = this.onPageChange.bind(this);
    this.onSearchFoodName = this.onSearchFoodName.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.onTextClear = this.onTextClear.bind(this);
    // this.onTextChange = this.onTextChange.bind(this);
  }
  componentDidMount() {
    const searchText = document.getElementById('searchText').value;
    if (!searchText) {
      document.getElementById('searchText').value = this.props.searchText;
    }
  }
  onPageChange(value) {
    const searchText = document.getElementById('searchText').value;
    this.context.router.push(`/food/search=${searchText}&page=${value}`);
  }
  onSearchFoodName() {
    const searchText = document.getElementById('searchText').value;
    this.context.router.push(`/food/search=${searchText}`);
  }
  onTextClear() {
    this.setState({ searchText: '' });
    // this.refs.searchText2.value = '';
    // document.getElementById('searchText').value = '';
    this.context.router.push('/food');
  }
  handleKeyPress(key) {
    if (key.charCode === 13) {
      this.onSearchFoodName();
    }
  }
  render() {
    return (
      <div style={styles.root}>
        <Title render={(previousTitle) => `FOOD - ${previousTitle}`} />
        <h2>FOOD Table</h2>
        <Divider />
        <FoodNameAuto
          ref="searchText"
          id="searchText"
          floatingLabelText="음식 이름"
          dataSource={dataSource1}
          searchText={this.props.searchText}
          onKeyPress={this.handleKeyPress}
          onTextClear={this.onTextClear}
        />
        <Chip
          style={{ display: 'inline' }}
          onTouchTap={this.onSearchFoodName}
        >
          <Avatar icon={<SearchIcon />} />
          {this.props.recordTotal.toLocaleString()}
        </Chip>
        <FoodList fooddata={this.props.fooddata} />
        <div style={{ textAlign: 'center' }}>
          <Paging
            currentPage={this.props.page}
            totalPages={this.props.pageTotal}
            onChange={this.onPageChange}
          />
        </div>
      </div>
    );
  }
}

FoodPage.contextTypes = {
  router: React.PropTypes.object,
};

FoodPage.propTypes = {
  fooddata: React.PropTypes.array,
  page: React.PropTypes.number,
  pageTotal: React.PropTypes.number,
  recordTotal: React.PropTypes.number,
  searchText: React.PropTypes.string,
};
