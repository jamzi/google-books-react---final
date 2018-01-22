import React from 'react';
import './Book.css';
import genericBook from './generic-book.png';

const Book = props => {
    const { book } = props;
    const smallThumbnail = (book.volumeInfo && book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.smallThumbnail) || genericBook;
    const authorList = book.volumeInfo && book.volumeInfo.authors && book.volumeInfo.authors.map((author, index) => {
        return <span key={index}>{author}</span>
    });

    return (
        <div className="book">
            <img className="book-thumbnail" src={smallThumbnail ? smallThumbnail : ''} alt={smallThumbnail ? book.volumeInfo.title : 'no-image'} />
            <div className="book-info">
                <div className="book-info-title">{book.volumeInfo.title}</div>
                <ul className="book-info-authors">
                    {authorList ? authorList: 'No authors to display'}
                </ul>
            </div>
        </div>
    )
}

export default Book;

