
import React, { Component } from 'react';
import { CircularProgress } from 'material-ui/Progress';
import List, { ListItem, ListItemText } from 'material-ui/List';
import { Link } from 'react-router-dom';

import { getMyLibraryBookshelves } from './../../utils/books';
import './Bookshelves.css';


class Bookshelves extends Component {

    constructor() {
        super();

        this.state = {
            bookshelves: [],
            isLoaded: false
        }
    }

    componentDidMount() {
        getMyLibraryBookshelves().then((bookshelves) => {
            this.setState({ bookshelves: bookshelves.items, isLoaded: true });
        });
    }

    render() {
        const { isLoaded, bookshelves } = this.state;

        const bookshelvesList = bookshelves && bookshelves.map((bookshelve) => {
            const { title = '', volumeCount = 0, id } = bookshelve;
            return (
                <Link key={id} to={`bookshelve/${id}`}>
                    <ListItem>
                        <ListItemText primary={title} secondary={volumeCount ? 'Number of books: ' + volumeCount : ''} />
                    </ListItem>
                </Link>
            );
        });

        if (!isLoaded) {
            return (<div className="spinner">
                <CircularProgress />
            </div>);
        } else {
            return (
                <div className="App">
                    <header className="App-header">
                        <h3>Bookshelves</h3>
                    </header>
                    <List>
                        {bookshelvesList}
                    </List>
                </div>
            );
        }

    }
}

export default Bookshelves;


