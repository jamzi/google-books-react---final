import React from 'react';

import Book from './../Book/Book';
import './BookList.css';

const BookList = props => {
    const {
        books
    } = props;

    const booksList = books.map((book) => {
        return <Book key={book.id} book={book} />
    });

    return (
        <div className="book-list">
            {booksList.length ? booksList : 'No books to display'}
        </div>
    )
}

export default BookList;

