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
            bookshelfInfo: {}
        }
    }

    componentDidMount() {
        let bookshelfId = this.props.match.params.bookshelfId;

        getBooksFromBookshelf(bookshelfId).then((bookshelfInfo) => {
            this.setState({ bookshelfInfo, isLoaded: true });
        });
    }

    render() {
        const { isLoaded, bookshelfInfo } = this.state;

        if (!isLoaded) {
            return (
                <div className="spinner">
                    <CircularProgress />
                </div>);
        } else {
            return (
                <SearchResultList books={bookshelfInfo.items} />
            )
        }
    }
}

export default BookshelfDetail;