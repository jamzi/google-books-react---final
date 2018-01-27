
import React, { Component } from 'react';

import SearchResultList from './../SearchResultList/SearchResultList';
import SearchInput from './../SearchInput/SearchInput';
import { searchBooks } from './../../Common/API';
import './SearchWrapper.css';

class SearchWrapper extends Component {
    throttleTime = 400;

    constructor() {
        super();

        this.state = {
            books: [],
            searchTerm: ''
        }

        this.throttledHandleChange = this.throttledHandleChange.bind(this);
    }

    throttledHandleChange(e) {
        let searchTerm = e.target.value;
        if (this.throttleTimeout) {
            clearTimeout(this._throttleTimeout)
        }

        this.throttleTimeout = setTimeout(
            () => {
                searchBooks(searchTerm).then((books) => {
                    this.setState({ books });
                });
            },
            this.throttleTime
        )
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <SearchInput onSearchTermChange={this.throttledHandleChange} />
                </header>
                <SearchResultList books={this.state.books} />
            </div>
        );
    }
}

export default SearchWrapper;


