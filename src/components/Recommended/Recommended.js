
import React, { Component } from 'react';

import SearchResultList from './../Search/SearchResultList/SearchResultList';
import { getRecommendedBooks } from './../../utils/books';
import './../Search/SearchWrapper/SearchWrapper.css';

class Recommended extends Component {

    constructor() {
        super();

        this.state = {
            recommendedBooks: [],
            isLoaded: false
        }
    }

    componentDidMount() {
        getRecommendedBooks().then((recommendedBooks) => {
            this.setState({ recommendedBooks: recommendedBooks.items, isLoaded: true });
        });
    }

    render() {
        const { isLoaded, recommendedBooks } = this.state;
        if (!isLoaded) {
            return (<div>Loading ...</div>);
        } else {
            return (
                <div className="App">
                    <header className="App-header">
                        <h1>Recommended books</h1>
                    </header>
                    <SearchResultList books={recommendedBooks} />
                </div>
            );
        }

    }
}

export default Recommended;


