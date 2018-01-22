import React, { Component } from 'react';
import './Search.css';

class Search extends Component {
    throttleTime = 400;

    constructor(props) {
        super(props);
        this.handleSearchTermChange = this.handleSearchTermChange.bind(this);
    }

    handleSearchTermChange(e) {
        let searchTerm = e.target.value;
        if (this.throttleTimeout) {
            clearTimeout(this._throttleTimeout)
        }
        this.throttleTimeout = setTimeout(
            () => this.props.onSearchTermChange(searchTerm),
            this.throttleTime
        )
    }

    render() {
        return (
            <input type="text" className="search-input" placeholder="Search books" onChange={this.handleSearchTermChange} />
        )
    }
}

export default Search;