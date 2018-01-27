import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import SearchWrapper from './../Search/SearchWrapper/SearchWrapper';
import BookDetail from './../BookDetail/BookDetail';

const App = () => (
  <Router>
    <div>
      <Route exact path="/" component={SearchWrapper} />
      <Route path="/book/:bookId" component={BookDetail} />
    </div>
  </Router>
);

export default App;
