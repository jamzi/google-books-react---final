
import React, { Component } from 'react';
import debounce from 'lodash/debounce';
import Divider from 'material-ui/Divider';
import { CircularProgress } from 'material-ui/Progress';

import SearchResultList from './../SearchResultList/SearchResultList';
import SearchInput from './../SearchInput/SearchInput';
import { searchBooks } from './../../../utils/books';
import './SearchWrapper.css';

class SearchWrapper extends Component {
    constructor() {
        super();

        this.state = {
            books: [],
            searchTerm: '',
            currentIndex: 0,
            isLoaded: true,
        }

        this.debouncedHandleChange = this.debouncedHandleChange.bind(this);
        this.handleMoreRequest = this.handleMoreRequest.bind(this);
    }

    componentDidMount() {
        window.onscroll = (event) => {
          if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
            this.handleMoreRequest();
          }
        }
    }

    debouncedHandleChange = debounce(searchTerm => {
        this.setState({ searchTerm });
        this.handleSearchBooks(searchTerm);
    }, 500)

    handleMoreRequest() {
        const { searchTerm, currentIndex } = this.state;
        const newIndex = currentIndex + 10;
        this.setState({ currentIndex: newIndex}, () => this.handleSearchBooks(searchTerm, newIndex));
    }

    handleSearchBooks(searchTerm, currentIndex = 0) {
        let existingBooks = currentIndex ? this.state.books : [];
        
        if (currentIndex === 0) {
            this.setState({ isLoaded: false });
        }

        searchBooks(searchTerm, currentIndex).then((books) => {
            this.setState({ books: [...existingBooks, ...books], isLoaded: true });
        });
    }

    render() {
        const { books, isLoaded } = this.state;
        return (
            <div className="App">
                <header className="App-header">
                    <SearchInput onSearchTermChange={(e) => this.debouncedHandleChange(e.target.value)} />
                </header>
                <Divider />
                { isLoaded ? 
                    <SearchResultList books={books} onLoadMoreResults={this.handleMoreRequest} /> : 
                    <div className="spinner">
                        <CircularProgress />
                    </div>
                }
            </div>
        );
    }
}

export default SearchWrapper;


