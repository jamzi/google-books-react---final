import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect
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
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <PrivateRoute isAuthenticated={this.state.isAuthenticated} path="/search" component={SearchWrapper} />
          <PrivateRoute isAuthenticated={this.state.isAuthenticated} path="/recommended" component={Recommended} />
          <PrivateRoute isAuthenticated={this.state.isAuthenticated} path="/book/:bookId" component={BookDetail} />
        </div>
      </Router>
    )
  }
}

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => (
  <Route {...rest} render={props => (
    isAuthenticated ? (
      <Component {...props} />
    ) : (
        <Redirect to={{
          pathname: '/login',
          state: { from: props.location }
        }} />
      )
  )} />
)

export default App;
