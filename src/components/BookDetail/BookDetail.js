import React, { Component } from 'react';
import { getBook } from '../Common/API';

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
        if (!isLoaded) {
            return (<div>Loading ...</div>);
        } else {
            return (
                <div>
                    <h1>{bookInfo.title}</h1><span>({bookInfo.publishedDate})</span>
                    <div>By: { authors ? authors : 'No authors to display'}</div>
                    <h3>{bookInfo.description}</h3>
                    <div>Categories: { categories ? categories : 'No categories to display'}</div>
                </div>
            )
        }
    }
}

export default BookDetail;