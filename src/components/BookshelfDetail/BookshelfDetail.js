import React, { Component } from 'react';
import { getBooksFromBookshelf } from '../../utils/books';
import { CircularProgress } from 'material-ui/Progress';

import './BookshelfDetail.css';
import SearchResultList from './../Search/SearchResultList/SearchResultList';

class BookshelfDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoaded: false,
            bookshelfInfo: {},
            bookshelfId: null
        }
    }

    componentDidMount() {
        let bookshelfId = this.props.match.params.bookshelfId;

        getBooksFromBookshelf(bookshelfId).then((bookshelfInfo) => {
            this.setState({ bookshelfInfo, isLoaded: true, bookshelfId });
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
                <SearchResultList books={bookshelfInfo.items} bookshelfId={bookshelfId} />
            )
        }
    }
}

export default BookshelfDetail;