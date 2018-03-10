/* global gapi */

import React, { Component } from 'react';
import Button from 'material-ui/Button';
import ReactGA from 'react-ga';
import { Redirect } from 'react-router-dom';

import { getBooksFromBookshelf } from '../../utils/books';
import HorizontalBooksList from '../Home/HorizontalBooksList/HorizontalBooksList';
import './Home.css';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: false,
      redirectToReferrer: false,
      booksForYou: [],
      booksReadingNow: []
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

  componentDidMount() {
    if (gapi.auth2.getAuthInstance().isSignedIn.get()) {
      this.fetchBooksForYou();
      this.fetchBooksReadingNow();
    }
  }

  fetchBooksForYou() {
    const booksForYouId = 8;
    getBooksFromBookshelf(booksForYouId).then((books) => {
      this.setState({ booksForYou: books });
    });
  }

  fetchBooksReadingNow() {
    const booksReadingNow = 3;
    getBooksFromBookshelf(booksReadingNow).then((books) => {
      this.setState({ booksReadingNow: books });
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
    const { from } = this.props.location.state || { from: { pathname: "/" } };
    const { isLoggedIn, redirectToReferrer, booksForYou, booksReadingNow } = this.state;
    let content;

    if (isLoggedIn) {
      content =
        <div>
          <HorizontalBooksList title={'Books for you'} books={booksForYou} />
          <HorizontalBooksList title={'Reading now'} books={booksReadingNow} />

          <div class="actions">
            <Button variant="raised" color="primary" onClick={this.handleLogoutClick}>
              Logout
            </Button>
          </div>
        </div>
    } else {
      content =
        <div class="actions">
          <Button variant="raised" color="primary" onClick={this.handleLoginClick}>
            Log in with Google
          </Button>
        </div>
    }

    if (redirectToReferrer) {
      return <Redirect to={from} />;
    }

    return (
      <div>
        {content}
      </div>
    )
  }
}

export default Home;