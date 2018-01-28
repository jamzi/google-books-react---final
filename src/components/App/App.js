import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from 'react-router-dom'

import SearchWrapper from './../Search/SearchWrapper/SearchWrapper';
import BookDetail from './../BookDetail/BookDetail';
import Recommended from './../Recommended/Recommended';
import Login from './../Login/Login';
import Home from './../Home/Home';
import AuthButton from './../AuthButton/AuthButton';
import { auth } from './../Common/API';

const App = () => (
  <Router>
    <div>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/search">Search</Link></li>
        <li><Link to="/recommended">Recommended</Link></li>
      </ul>
      <AuthButton/>
      <Route exact path="/" component={Home}/>
      <Route path="/login" component={Login}/>
      <PrivateRoute path="/search" component={SearchWrapper}/>
      <PrivateRoute path="/recommended" component={Recommended} />
      <PrivateRoute path="/book/:bookId" component={BookDetail} />
    </div>
  </Router>
);

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    auth.isAuthenticated() ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }}/>
    )
  )}/>
)

export default App;
