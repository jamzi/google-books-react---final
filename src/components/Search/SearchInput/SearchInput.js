import React from 'react';
import TextField from 'material-ui/TextField';

import './SearchInput.css';

const SearchInput = (props) => (
    <TextField
        id="search"
        label="Search books"
        type="search"
        margin="normal"
        fullWidth
        onChange={props.onSearchTermChange}
    />
)

export default SearchInput;