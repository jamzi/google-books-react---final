import React from 'react';
import TextField from 'material-ui/TextField';

const SearchInput = (props) => (
    <TextField
        id="search"
        label="Search books"
        type="search"
        margin="normal"
        autoFocus
        fullWidth
        onChange={props.onSearchTermChange}
    />
)

export default SearchInput;