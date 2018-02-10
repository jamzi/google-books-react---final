import React from 'react';
import { Link } from 'react-router-dom'

import './SearchResult.css';
import genericBook from './generic-book.png';

const SearchResult = (props) => {
    const { book } = props;
    const smallThumbnail = getThumbnail(book) || genericBook;
    const authorList = getAuthorList(book);

    function getThumbnail(book) {
        let thumbnailUrl = book.volumeInfo && book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.smallThumbnail;
        return thumbnailUrl ? thumbnailUrl.replace(/^http:\/\//i, 'https://') : '';
    }

    function getAuthorList(book) {
        let authorList = book.volumeInfo && book.volumeInfo.authors && book.volumeInfo.authors;
        if (!authorList) {
            return <span>No authors to display</span>;
        }
        return authorList.map((author, index) => {
            return <span key={index}>{author}</span>;
        });
    }

    return (
        <Link to={`book/${book.id}`}>
            <div className="book">
                <img className="book-thumbnail" src={smallThumbnail} alt={smallThumbnail ? book.volumeInfo.title : 'no-image'} />
                <div className="book-info">
                    <div className="book-info-title">{book.volumeInfo.title}</div>
                    <ul className="book-info-authors">
                        {authorList}
                    </ul>
                </div>
            </div>
        </Link>
    )
}

export default SearchResult;

