import React from 'react';
import { Link } from 'react-router-dom';
import { ListItem, ListItemText, ListItemIcon } from 'material-ui/List';

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
            return <span key={index}>{author}{index + 1 !== authorList.length ? ', ' : ''}</span>;
        });
    }

    return (
        <Link to={`/book/${book.id}`}>
            <ListItem>
                <ListItemIcon>
                    <img className="book-thumbnail" src={smallThumbnail} alt={smallThumbnail ? book.volumeInfo.title : 'no-image'} />
                </ListItemIcon>
                <ListItemText primary={book.volumeInfo.title} secondary={authorList} />
            </ListItem>
        </Link>
    )
}

export default SearchResult;

