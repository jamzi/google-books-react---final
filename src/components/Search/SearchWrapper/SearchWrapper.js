
import React, { Component } from 'react';
import debounce from 'lodash/debounce';
import { CircularProgress } from 'material-ui/Progress';
import ReactGA from 'react-ga';

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
        ReactGA.event({
            category: 'Search',
            action: `Loading more results (infinity scroll)`,
        });
    }

    handleSearchBooks(searchTerm, currentIndex = 0) {
        let existingBooks = currentIndex ? this.state.books : [];

        if (currentIndex === 0) {
            this.setState({ isLoaded: false });
        }

        if (searchTerm === '') {
            this.setState({ books: [], isLoaded: true });
            return;
        }

        searchBooks(searchTerm, currentIndex).then((books) => {
            this.setState({ books: [...existingBooks, ...books], isLoaded: true });
            ReactGA.event({
                category: 'Search',
                action: `Searching for books`,
            });
        });
    }

    render() {
        const { books, isLoaded } = this.state;
        return (
            <div>
                <header>
                    <SearchInput onSearchTermChange={(e) => this.debouncedHandleChange(e.target.value)} />
                </header>
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


