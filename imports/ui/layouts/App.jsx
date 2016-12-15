import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import Title from 'react-title-component';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
// import baseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
// import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import Navbar from '../components/Navbar.jsx';
import { orange100, orange500, orange700 } from 'material-ui/styles/colors';
import { StickyContainer } from 'react-sticky';

// import './App.css';

const CONNECTION_ISSUE_TIMEOUT = 1000;
const muiThemeGreen = getMuiTheme({
  palette: {
    primary1Color: orange500,
    primary2Color: orange700,
    primary3Color: orange100,
  },
}, {
  avatar: {
    borderColor: null,
  },
  // userAgent: req.headers['user-agent'],
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showConnectionIssue: false,
    };
  }
  getChildContext() {
    return {
      muiTheme: muiThemeGreen,
      location: this.props.location,
    };
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({ showConnectionIssue: true });
    }, CONNECTION_ISSUE_TIMEOUT);
  }
  render() {
    const { showConnectionIssue } = this.state;
    const {
      user,
      connected,
      children,
    } = this.props;

    return (
      <MuiThemeProvider muiTheme={muiThemeGreen}>
        <StickyContainer id="sticky_container">
          <Title render="Nutri Agent" />
          <Navbar user={this.props.user} />
          <div className="detail">
            {this.props.children}
          </div>
        </StickyContainer>
      </MuiThemeProvider>
    );
  }
}

App.propTypes = {
  connected: React.PropTypes.bool,
  user: React.PropTypes.object,
  children: React.PropTypes.element,
  location: React.PropTypes.object,
};

App.childContextTypes = {
  muiTheme: React.PropTypes.object, //.isRequired,
  location: React.PropTypes.object,
};

export default App;
