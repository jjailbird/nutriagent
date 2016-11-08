import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import MediaQuery from 'react-responsive';
import { Tabs, Tab } from 'material-ui/Tabs';
import { Link } from 'react-router';

const styles = {
  tabs: {
    width: '390px',
  },
  tab: {
    height: '64px',
    color: 'white',
  },
};

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = { tabIndex: '/' };
    this.onChangeRoute = this.onChangeRoute.bind(this);
  }
  componentWillMount() {
    this.setState({ tabIndex: 1 });
  }
  componentWillReceiveProps() {
    setTimeout(() => {
      this.setState({
        tabIndex: this.getSelectedIndex(),
      });
    }, 0);
  }
  onChangeRoute(route) {
    this.context.router.push(route);
    this.setState({ tabIndex: route });
  }
  getSelectedIndex() {
    let idx = '';
    if (this.context.router.isActive('/', true)) {
      idx = '/';
    } else if (this.context.router.isActive('/signin')) {
      idx = '/signin';
    } else if (this.context.router.isActive('/siginup')) {
      idx = '/signup';
    } else if (this.context.router.isActive('/home')) {
      idx = '/home';
    }
    return idx;
  }
  render() {
    return (
      <div>
        <MediaQuery orientation="landscape">
          <AppBar
            title="Title"
            showMenuIconButton={false}
            iconClassNameRight="muidocs-icon-navigation-expand-more"
          >
            <Tabs
              style={styles.tabs}
              value={this.state.tabIndex}
              onChange={this.onChangeRoute}
            >
              <Tab label="SignIn" value="/signin" containerElement={<Link to="/signin" />} style={styles.tab} />
              <Tab label="SignUp" value="/signup" containerElement={<Link to="/signup" />} style={styles.tab} />
              <Tab label="Home" value="/Home" containerElement={<Link to="/home" />} style={styles.tab} />
            </Tabs>
          </AppBar>
        </MediaQuery>
        <MediaQuery orientation="portrait">
          <AppBar
            title="Title"
            iconClassNameRight="muidocs-icon-navigation-expand-more"
          />
        </MediaQuery>
      </div>
    );
  }
}

Navbar.contextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
  router: React.PropTypes.object.isRequired,
};

export default Navbar;
