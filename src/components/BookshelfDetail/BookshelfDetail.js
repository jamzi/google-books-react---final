import React, { Component } from 'react';
import { getBooksFromBookshelf, getBookshelfName, removeBookFromBookshelf } from '../../utils/books';
import { CircularProgress } from 'material-ui/Progress';
import ReactGA from 'react-ga';

import SearchResultList from './../Search/SearchResultList/SearchResultList';
import './BookshelfDetail.css';

class BookshelfDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoaded: false,
            books: [],
            bookshelfId: null,
            bookshelfHeaderName: ''
        }
        this.handleRemoveBookFromBookshelf = this.handleRemoveBookFromBookshelf.bind(this);
    }

    componentDidMount() {
        this.setBookshelfHeaderName();
        this.fetchBooksFromBookshelf();
    }

    setBookshelfHeaderName() {
        let name = getBookshelfName(+this.props.match.params.bookshelfId);
        this.setState({
            bookshelfHeaderName: name
        });
    }

    fetchBooksFromBookshelf() {
        let bookshelfId = this.props.match.params.bookshelfId;

        getBooksFromBookshelf(bookshelfId).then((books) => {
            this.setState({ books, isLoaded: true, bookshelfId });
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
        const { isLoaded, books, bookshelfId, bookshelfHeaderName } = this.state;

        if (!isLoaded) {
            return (
                <div className="spinner">
                    <CircularProgress />
                </div>);
        } else {
            return (
                <div>
                    <header>
                        <h3 className="bookshelf-header">{bookshelfHeaderName}</h3>
                    </header>
                    <SearchResultList books={books} bookshelfId={bookshelfId} onRemoveBookFromBookshelf={this.handleRemoveBookFromBookshelf} />
                </div>
            )
        }
    }
}

export default BookshelfDetail;