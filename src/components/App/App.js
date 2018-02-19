/* global gapi */

import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import Script from 'react-load-script'

import SearchWrapper from './../Search/SearchWrapper/SearchWrapper';
import BookDetail from './../BookDetail/BookDetail';
import Recommended from './../Recommended/Recommended';
import Bookshelves from './../Bookshelves/Bookshelves';
import BookshelveDetail from './../BookshelveDetail/BookshelveDetail';
import Home from './../Home/Home';
import Header from './../Header/Header';
import './App.css';
import config from './../../utils/auth';
import { setAccessToken } from './../../utils/books';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userPhotoUrl: '',
      gapiLoaded: false
    }
  }

  render() {
    const handleScriptError = () => this.setState({ gapiLoaded: false })
    const handleScriptLoad = () => {
      const initClient = () => {
        gapi.client.init(config).then(() => {
          const auth2 = gapi.auth2.getAuthInstance();
          auth2.isSignedIn.listen(handleSigninStatusChange);

          const currentUser = auth2.currentUser.get();
          const authResponse = currentUser.getAuthResponse(true);
          if (authResponse.access_token) {
            setAccessToken(authResponse.access_token);
          }
          this.setState({ 
            gapiLoaded: true, 
            userPhotoUrl: currentUser.getBasicProfile().getImageUrl() 
          });
        });
      }
      gapi.load('client:auth2', initClient);
    }

    const handleSigninStatusChange = (isSignedIn) => {
      const auth2 = gapi.auth2.getAuthInstance();
      if (isSignedIn) {
        const currentUser = auth2.currentUser.get();
        const authResponse = currentUser.getAuthResponse(true);
        if (authResponse.access_token) {
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

    let element
    if (this.state.gapiLoaded) {
      element = (
        <Router>
          <div>
            <Header userPhotoUrl={this.state.userPhotoUrl} />
            <div className="app-routes">
              <Route path="/search" component={SearchWrapper} />
              <Route exact path="/" component={Home} />
              <Route path="/recommended" component={Recommended} />
              <Route path="/book/:bookId" component={BookDetail} />
              <Route path="/bookshelves" component={Bookshelves} />
              <Route path="/bookshelve/:bookshelveId" component={BookshelveDetail} />
            </div>
          </div>
        </Router>
      )
    } else {
      element = <div>Loading GAPI</div>
    }

    return (
      <div>
        <Script
          url="https://apis.google.com/js/api.js"
          onError={handleScriptError}
          onLoad={handleScriptLoad}
        />
        {element}
      </div>
    )
  }
}

export default App;
