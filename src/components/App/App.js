/* global gapi */

import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect
} from 'react-router-dom';
import { CircularProgress } from 'material-ui/Progress';

import SearchWrapper from './../Search/SearchWrapper/SearchWrapper';
import BookDetail from './../BookDetail/BookDetail';
import Recommended from './../Recommended/Recommended';
import Bookshelves from './../Bookshelves/Bookshelves';
import BookshelfDetail from './../BookshelfDetail/BookshelfDetail';
import Home from './../Home/Home';
import Header from './../Header/Header';
import './App.css';
import config from './../../utils/auth';
import { setAccessToken } from './../../utils/books';
import withTracker from './../../utils/withTracker';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userPhotoUrl: '',
      gapiLoaded: false
    }
  }

  componentDidMount() {
    const script = document.createElement("script");
    script.src = "https://apis.google.com/js/client.js";

    script.onload = () => {
      const initClient = () => {
        gapi.client.init(config).then(() => {
          const auth2 = gapi.auth2.getAuthInstance();
          auth2.isSignedIn.listen(this.handleSigninStatusChange);

          const currentUser = auth2.currentUser.get();
          const authResponse = currentUser.getAuthResponse(true);
          if (authResponse && currentUser) {
            setAccessToken(authResponse.access_token);
            this.setState({
              userPhotoUrl: currentUser.getBasicProfile().getImageUrl()
            })
          }
          this.setState({
            gapiLoaded: true
          });
        });
      }
      gapi.load('client:auth2', initClient);
    };

    document.body.appendChild(script);
  }

  handleSigninStatusChange = (isSignedIn) => {
    const auth2 = gapi.auth2.getAuthInstance();
    if (isSignedIn) {
      const currentUser = auth2.currentUser.get();
      const authResponse = currentUser.getAuthResponse(true);
      if (authResponse) {
        setAccessToken(authResponse.access_token);
      }
      this.setState({
        userPhotoUrl: currentUser.getBasicProfile().getImageUrl()
      });
    } else {
      this.setState({
        userPhotoUrl: ''
      });
    }
  }

  handleScriptError = () => this.setState({ gapiLoaded: false })

  render() {
    let element;
    if (this.state.gapiLoaded) {
      element = (
        <Router>
          <div>
            <Header userPhotoUrl={this.state.userPhotoUrl} />
            <div className="app-routes">
              <Route exact path="/" component={withTracker(Home)} />
              <PrivateRoute path="/search" component={withTracker(SearchWrapper)} />
              <PrivateRoute path="/recommended" component={withTracker(Recommended)} />
              <PrivateRoute path="/book/:bookId" component={withTracker(BookDetail)} />
              <PrivateRoute path="/bookshelves" component={withTracker(Bookshelves)} />
              <PrivateRoute path="/bookshelf/:bookshelfId" component={withTracker(BookshelfDetail)} />
            </div>
          </div>
        </Router>
      )
    } else {
      element = <div className="spinner">
        <CircularProgress />
      </div>
    }

    return (
      <div>
        {element}
      </div>
    )
  }
}

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      gapi.auth2.getAuthInstance().isSignedIn.get() ? (
        <Component {...props} />
      ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: props.location }
            }}
          />
        )
    }
  />
);

export default App;
