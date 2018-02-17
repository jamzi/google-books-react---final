import React, { Component } from 'react';
import { getBook } from '../../utils/books';
import { CircularProgress } from 'material-ui/Progress';

import './BookDetail.css';

class BookDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoaded: false,
            bookInfo: {}
        }
    }

    componentDidMount() {
        let bookId = this.props.match.params.bookId;

        getBook(bookId).then((bookInfo) => {
            this.setState({ bookInfo: bookInfo.volumeInfo, isLoaded: true });
        });
    }

    render() {
        const { isLoaded, bookInfo } = this.state;
        const authors = bookInfo.authors && bookInfo.authors.map((author, index) => {
            return <span key={index}>{author}</span>
        });
        const categories = bookInfo.categories && bookInfo.categories.map((category, index) => {
            return <span key={index}>{category}</span>
        });
        const strippedDescription = bookInfo && bookInfo.description && bookInfo.description.replace(/<(.|\n)*?>/g, '');
        if (!isLoaded) {
            return (
                <div className="spinner">
                    <CircularProgress />
                </div>);
        } else {
            return (
                <div className="book-detail">
                    <h1>{bookInfo.title}</h1><span>({bookInfo.publishedDate})</span>
                    <div>By: {authors ? authors : 'No authors to display'}</div>
                    <h3>{strippedDescription}</h3>
                    <div>Categories: {categories ? categories : 'No categories to display'}</div>
                </div>
            )
        }
    }
}

export default BookDetail;