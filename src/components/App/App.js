import React, { Component } from 'react';

import BookList from './../BookList/BookList';
import Search from './../Search/Search';
import { fetchBooks } from './../Common/API';
import './App.css';

class App extends Component {
  constructor() {
    super();

    this.state = {
      books: [],
      searchTerm: ''
    }

    this.throttledHandleChange = this.throttledHandleChange.bind(this);
  }

  throttledHandleChange(searchTerm) {
    fetchBooks(searchTerm).then((books) => {
      this.setState({ books });
    });
  }

  render() {

    return (
      <div className="App">
        <header className="App-header">
          <Search onSearchTermChange={this.throttledHandleChange} />
        </header>
        <BookList books={this.state.books}/>
      </div>
    );
  }
}

export default App;
