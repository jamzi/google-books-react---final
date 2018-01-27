import React from 'react';
import './SearchInput.css';

const SearchInput = (props) => (
    <input type="text" className="search-input" placeholder="Search books" onChange={props.onSearchTermChange} />
)

export default SearchInput;