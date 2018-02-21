import React, { Component } from 'react';
import { getBooksFromBookshelf } from '../../utils/books';
import { CircularProgress } from 'material-ui/Progress';
import ReactGA from 'react-ga';

import './BookshelfDetail.css';
import SearchResultList from './../Search/SearchResultList/SearchResultList';
import { removeBookFromBookshelf } from '../../utils/books';

class BookshelfDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoaded: false,
            bookshelfInfo: {},
            bookshelfId: null
        }
        this.handleRemoveBookFromBookshelf = this.handleRemoveBookFromBookshelf.bind(this);
    }

    componentDidMount() {
        this.fetchBooksFromBookshelf();
    }

    fetchBooksFromBookshelf() {
        let bookshelfId = this.props.match.params.bookshelfId;

        getBooksFromBookshelf(bookshelfId).then((bookshelfInfo) => {
            this.setState({ bookshelfInfo, isLoaded: true, bookshelfId });
        });
    }

    handleRemoveBookFromBookshelf(bookId) {
        removeBookFromBookshelf(this.state.bookshelfId, bookId).then((response) => {
            ReactGA.event({
                category: 'Bookshelf',
                action: `Remove book from bookshelf #${this.state.bookshelfId}`,
            });
            this.fetchBooksFromBookshelf();
        });
    }

    render() {
        const { isLoaded, bookshelfInfo, bookshelfId } = this.state;

        if (!isLoaded) {
            return (
                <div className="spinner">
                    <CircularProgress />
                </div>);
        } else {
            return (
                <SearchResultList books={bookshelfInfo.items} bookshelfId={bookshelfId} onRemoveBookFromBookshelf={this.handleRemoveBookFromBookshelf}/>
            )
        }
    }
}

export default BookshelfDetail;