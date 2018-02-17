import React, { Component } from 'react';
import { getBooksFromBookshelve } from '../../utils/books';
import { CircularProgress } from 'material-ui/Progress';

import './BookshelveDetail.css';
import SearchResultList from './../Search/SearchResultList/SearchResultList';

class BookshelveDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoaded: false,
            bookshelveInfo: {}
        }
    }

    componentDidMount() {
        let bookshelveId = this.props.match.params.bookshelveId;

        getBooksFromBookshelve(bookshelveId).then((bookshelveInfo) => {
            this.setState({ bookshelveInfo: bookshelveInfo, isLoaded: true });
        });
    }

    render() {
        const { isLoaded, bookshelveInfo } = this.state;

        if (!isLoaded) {
            return (
                <div className="spinner">
                    <CircularProgress />
                </div>);
        } else {
            return (
                <SearchResultList books={bookshelveInfo.items} />
            )
        }
    }
}

export default BookshelveDetail;