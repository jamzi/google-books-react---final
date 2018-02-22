/* global gapi */

import React, { Component } from 'react';
import Button from 'material-ui/Button';
import ReactGA from 'react-ga';
import { Redirect } from 'react-router-dom';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: false,
      redirectToReferrer: false
    }
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
  }

  componentWillMount() {
    const getLoginState = () =>
      gapi.auth2.getAuthInstance().isSignedIn.get()
    this.setState({ isLoggedIn: getLoginState() })

    gapi.auth2.getAuthInstance().isSignedIn
      .listen(() => {
        this.setState({ isLoggedIn: getLoginState() })
      });
  }

  handleLoginClick() {
    gapi.auth2.getAuthInstance().signIn().then(() => {
      ReactGA.event({
        category: 'Authentication',
        action: `User logged in`,
      });
      this.setState({ redirectToReferrer: true })
    });
  }

  handleLogoutClick() {
    gapi.auth2.getAuthInstance().signOut().then(() => {
      ReactGA.event({
        category: 'Authentication',
        action: `User signed out`,
      });
    });
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: "/" }};
    const { isLoggedIn, redirectToReferrer } = this.state;
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

    if (redirectToReferrer) {
      return <Redirect to={from} />;
    }

    return (
      <div>
        {button}
      </div>
    )
  }
}

export default Home;