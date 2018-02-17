import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import firebase from '@firebase/app';
import '@firebase/auth';

import SearchWrapper from './../Search/SearchWrapper/SearchWrapper';
import BookDetail from './../BookDetail/BookDetail';
import Recommended from './../Recommended/Recommended';
import Login from './../Login/Login';
import Home from './../Home/Home';
import Header from './../Header/Header';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAuthenticated: false,
      user: {}
    }
  }

  componentWillMount () {
    this.removeAuthListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          isAuthenticated: true,
          user: user
        })
      } else {
        this.setState({
          isAuthenticated: false,
          user: {}
        })
      }
    })
  }

  componentWillUnmount () {
    this.removeAuthListener();
  }

  render() {
    return (
      <Router>
        <div>
          <Header user={this.state.user} isAuthenticated={this.state.isAuthenticated} />
          <Route path="/search" component={SearchWrapper} />
          <Route exact path="/" component={Home} />
          <Route path="/recommended" component={Recommended} />
          <Route path="/book/:bookId" component={BookDetail} /> 
          <Route path="/login" component={Login} />
        </div>
      </Router>
    )
  }
}

export default App;
