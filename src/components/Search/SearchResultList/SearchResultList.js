import React from 'react';

import SearchResult from './../SearchResult/SearchResult';
import './SearchResultList.css';

const SearchResultList = (props) => {
    const {
        books,
        onLoadMoreResults
    } = props;

    const booksList = books.map((book) => {
        return <SearchResult key={book.id} book={book} />
    });

    return (
        <div className="book-list">
            {booksList.length ? booksList : 'No books to display!'}
            {booksList.length ? <button className="load-more" onClick={onLoadMoreResults}>Load more</button> : ''}
        </div>
    )
}

export default SearchResultList;

