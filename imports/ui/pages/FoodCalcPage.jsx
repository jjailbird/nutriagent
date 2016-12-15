import React, { Component } from 'react';
import Divider from 'material-ui/Divider';
import Title from 'react-title-component';
import styles from '../css/default';

import Paper from 'material-ui/Paper';
import { BottomNavigation, BottomNavigationItem }
  from 'material-ui/BottomNavigation';
import { StickyContainer, Sticky } from 'react-sticky';
import FlatButton from 'material-ui/FlatButton';

import FoodNameAuto from '../components/foods/FoodNameAuto.jsx';
import FoodList from '../components/foods/FoodList.jsx';
import Paging from '../components/Pagination.jsx';
import SearchIcon from 'material-ui/svg-icons/action/search';
import Chip from 'material-ui/Chip';
import Avatar from 'material-ui/Avatar';

import FontIcon from 'material-ui/FontIcon';
import IconLocationOn from 'material-ui/svg-icons/communication/location-on';

const recentsIcon = <FontIcon className="material-icons">restore</FontIcon>;
const favoritesIcon = <FontIcon className="material-icons">favorite</FontIcon>;
const nearbyIcon = <IconLocationOn />;

export default class FoodCalcPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      showFootMenu: false,
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
    this.context.router.push(`/foodcalc/search=${searchText}&page=${value}`);
  }
  onSearchFoodName() {
    const searchText = document.getElementById('searchText').value;
    this.context.router.push(`/foodcalc/search=${searchText}`);
  }
  onTextClear() {
    this.setState({ searchText: '' });
    // this.refs.searchText2.value = '';
    // document.getElementById('searchText').value = '';
    this.context.router.push('/foodcalc');
  }
  handleKeyPress(key) {
    if (key.charCode === 13) {
      this.onSearchFoodName();
    }
  }
  render() {
    return (
      <StickyContainer style={styles.root}>
        <Title render={(previousTitle) => `FOOD Calulator - ${previousTitle}`} />
        <h2>FOOD Calculator</h2>
        <FlatButton
          label="Sticky TEST"
          onTouchTap={() => { this.setState({ showFootMenu: !this.state.showFootMenu }); }}
        />
        <Divider />
        <FoodNameAuto
          ref="searchText"
          id="searchText"
          floatingLabelText="음식 이름"
          /* dataSource={dataSource1} */
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
        <Sticky
          style={{ right: 0, bottom: 0, position: 'fixed' }}
          isActive={this.state.showFootMenu}
        >
          <Paper zDepth={1}>
            <BottomNavigation>
              <BottomNavigationItem
                label="Recents"
                icon={recentsIcon}
                onTouchTap={() => this.select(0)}
              />
              <BottomNavigationItem
                label="Favorites"
                icon={favoritesIcon}
                onTouchTap={() => this.select(1)}
              />
              <BottomNavigationItem
                label="Nearby"
                icon={nearbyIcon}
                onTouchTap={() => this.select(2)}
              />
            </BottomNavigation>
          </Paper>
        </Sticky>
      </StickyContainer>
    );
  }
}

FoodCalcPage.contextTypes = {
  router: React.PropTypes.object,
};

FoodCalcPage.propTypes = {
  fooddata: React.PropTypes.array,
  page: React.PropTypes.number,
  pageTotal: React.PropTypes.number,
  recordTotal: React.PropTypes.number,
  searchText: React.PropTypes.string,
};

