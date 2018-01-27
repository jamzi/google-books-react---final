import React from 'react';
import { Link } from 'react-router-dom'

import './SearchResult.css';
import genericBook from './generic-book.png';

const SearchResult = (props) => {
    const { book } = props;
    const smallThumbnail = (book.volumeInfo && book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.smallThumbnail) || genericBook;
    const authorList = book.volumeInfo && book.volumeInfo.authors && book.volumeInfo.authors.map((author, index) => {
        return <span key={index}>{author}</span>
    });

    return (
        <Link to={`book/${book.id}`}>
            <div className="book">
                <img className="book-thumbnail" src={smallThumbnail ? smallThumbnail : ''} alt={smallThumbnail ? book.volumeInfo.title : 'no-image'} />
                <div className="book-info">
                    <div className="book-info-title">{book.volumeInfo.title}</div>
                    <ul className="book-info-authors">
                        {authorList ? authorList: 'No authors to display'}
                    </ul>
                </div>
            </div>
        </Link>
    )
}

export default SearchResult;

