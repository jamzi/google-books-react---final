/* global gapi */

import React, { Component } from 'react';
import Button from 'material-ui/Button';
import ReactGA from 'react-ga';

class Home extends Component {
  componentWillMount() {
    const getLoginState = () =>
      gapi.auth2.getAuthInstance().isSignedIn.get()
    this.setState({ isLoggedIn: getLoginState() })

    gapi.auth2.getAuthInstance().isSignedIn
      .listen(() => this.setState({ isLoggedIn: getLoginState() }));
  }

  handleLoginClick() {
    gapi.auth2.getAuthInstance().signIn();
    ReactGA.event({
      category: 'Authentication',
      action: `User logged in`,
    });
  }

  handleLogoutClick() {
    gapi.auth2.getAuthInstance().signOut();
    ReactGA.event({
      category: 'Authentication',
      action: `User signed out`,
    });
  }

  render() {
    const { isLoggedIn } = this.state;
    let button;

    if (isLoggedIn) {
      button = <Button variant="raised" color="primary" onClick={this.handleLogoutClick}>
        Logout
                </Button>
    } else {
      button = <Button variant="raised" color="primary" onClick={this.handleLoginClick}>
        Log in with Google
                </Button>
    }

    return (
      <div>
        {button}
      </div>
    )
  }
}

export default Home;