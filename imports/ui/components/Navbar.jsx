import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Dialog from 'material-ui/Dialog';
import { Tabs, Tab } from 'material-ui/Tabs';
import { Toolbar, ToolbarGroup, ToolbarSeparator } from 'material-ui/Toolbar';
import FlatButton from 'material-ui/FlatButton';
import MediaQuery from 'react-responsive';
import { Sticky } from 'react-sticky';

const styles = {
  appbar: {
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.5)',
  },
  tabs: {
    width: '450px',
  },
  tab: {
    height: '64px',
    color: 'white',
  },
  toolbar: {
    height: '64px',
    backgroundColor: 'transparent',
    padding: '0px',
  },
};

const naviItems = [
  { title: 'HOME', route: '/home' },
  { title: 'Food', route: '/food' },
  { title: 'Upload', route: '/upload' },
  { title: 'Chart', route: '/chart' },
  { title: 'TEST', route: '/test' },
  { title: 'Linear', route: '/chart/linear' },
  { title: 'SIGNIN', route: '/signin' },
  { title: 'SIGNUP', route: '/signup' },
];

const naviTabs = [];
const naviMenuItems = [];
for (let i = 0; i < naviItems.length; i++) {
  naviTabs.push(
    <Tab key={i} value={naviItems[i].route} label={naviItems[i].title} style={styles.tab} />);
  naviMenuItems.push(
    <MenuItem key={i} value={naviItems[i].route} primaryText={naviItems[i].title} />
  );
}

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuOpen: false,
      dialogOpen: false,
    };
    this.onAppMenuTouch = this.onAppMenuTouch.bind(this);
    this.onMenuChange = this.onMenuChange.bind(this);
    this.onTabsChange = this.onTabsChange.bind(this);
  }
  onAppMenuTouch() {
    this.setState({ menuOpen: !this.state.menuOpen });
  }
  onMenuChange(object, value) {
    // console.log(value);
    this.context.router.push(value);
    this.setState({ menuOpen: false });
  }
  onTabsChange(value) {
    // console.log(value);
    this.context.router.push(value);
  }
  confirmLogout(on) {
    if (on) {
      Meteor.logout();
    }
    this.setState({ dialogOpen: false });
  }
  render() {
    const authLoginGroup = (
      <ToolbarGroup>
        <FlatButton
          label="로그인"
          style={{ height: 'auto', color: '#ccc',
            margin: '14px 0px 14px 14px', minWidth: '47px' }}
          labelStyle={{ fontSize: '11px', paddingLeft: '4px', paddingRight: '4px' }}
          onClick={() => { this.context.router.push('/signin'); }}
        />
        <ToolbarSeparator
          style={{
            top: '26px', backgroundColor: '#ccc', height: '10px',
            marginLeft: '0px', marginRight: '3px', width: '2px',
          }}
        />
        <FlatButton
          label="회원가입"
          style={{ height: 'auto', color: '#ccc',
            margin: '14px 0px', minWidth: '47px',
          }}
          labelStyle={{ fontSize: '11px', paddingLeft: '4px', paddingRight: '4px' }}
          onClick={() => { this.context.router.push('/signup'); }}
        />
      </ToolbarGroup>
    );
    const authLoggedGroup = (
      <ToolbarGroup>
        <FlatButton
          label={this.props.user ? this.props.user.username : 'username'}
          style={{ height: 'auto', color: '#ccc',
            margin: '14px 0px 14px 14px', minWidth: '47px' }}
          labelStyle={{ fontSize: '11px', paddingLeft: '4px', paddingRight: '4px' }}
        />
        <ToolbarSeparator
          style={{
            top: '26px', backgroundColor: '#ccc', height: '10px',
            marginLeft: '0px', marginRight: '3px', width: '2px',
          }}
        />
        <FlatButton
          label="로그아웃"
          style={{ height: 'auto', color: '#ccc',
            margin: '14px 0px', minWidth: '47px',
          }}
          labelStyle={{ fontSize: '11px', paddingLeft: '4px', paddingRight: '4px' }}
          onTouchTap={() => { this.setState({ dialogOpen: true, dialogMessage: '로그아웃하시겠습니까?' }); }}
        />
      </ToolbarGroup>
    );
    const dialogActions = [
      <FlatButton
        label="예"
        primary
        onTouchTap={() => { this.confirmLogout(true); }}
      />,
      <FlatButton
        label="아니오"
        onTouchTap={() => { this.confirmLogout(false); }}
      />,
    ];
    return (
      <div>
        <MediaQuery orientation="landscape">
          <Sticky>
            <AppBar
              title="Nutri Agent"
              titleStyle={{ cursor: 'pointer' }}
              style={styles.appbar}
              showMenuIconButton={false}
              onTitleTouchTap={() => { this.context.router.push('/'); }}
            >
              <Toolbar style={styles.toolbar}>
                <ToolbarGroup>
                  <Tabs
                    style={styles.tabs}
                    value={this.context.location.pathname}
                    onChange={this.onTabsChange}
                  >
                    {naviTabs}
                  </Tabs>
                </ToolbarGroup>
                {this.props.user ? authLoggedGroup : authLoginGroup}
              </Toolbar>
            </AppBar>
          </Sticky>
        </MediaQuery>
        <MediaQuery orientation="portrait">
          <Sticky>
            <AppBar
              title="Nutri Agent"
              style={styles.appbar}
              iconClassNameRight="muidocs-icon-navigation-expand-more"
              onLeftIconButtonTouchTap={this.onAppMenuTouch}
            >
              <Toolbar style={styles.toolbar}>
                {this.props.user ? authLoggedGroup : authLoginGroup}
              </Toolbar>
            </AppBar>
          </Sticky>
          <Drawer
            width={200}
            open={this.state.menuOpen}
            onRequestChange={(menuOpen) => this.setState({ menuOpen })}
            docked={false}
          >
            <Menu
              selectedMenuItemStyle={{ backgroundColor: 'black' }}
              value={this.context.location.pathname}
              onChange={this.onMenuChange}
            >
              {naviMenuItems}
            </Menu>
          </Drawer>
        </MediaQuery>
        <Dialog
          title="로그아웃?"
          actions={dialogActions}
          open={this.state.dialogOpen}
        >
          {this.state.dialogMessage}
        </Dialog>
      </div>
    );
  }
}

Navbar.propTypes = {
  user: React.PropTypes.object,
};

Navbar.contextTypes = {
  location: React.PropTypes.object,
  router: React.PropTypes.object,
};

export default Navbar;
