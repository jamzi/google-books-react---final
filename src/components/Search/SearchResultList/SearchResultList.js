import React from 'react';
import List from 'material-ui/List'

import SearchResult from './../SearchResult/SearchResult';
import './SearchResultList.css';

const SearchResultList = (props) => {
    const {
        books
    } = props;

    const booksList = books.map((book) => {
        return <SearchResult key={book.id} book={book} />
    });

    return (
        <div className="book-list">
            <List>
                {booksList.length ? booksList : 'No books to display!'}
            </List>
        </div>
    )
}

export default SearchResultList;

