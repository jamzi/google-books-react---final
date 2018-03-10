import React from 'react';
import GridList, { GridListTile } from 'material-ui/GridList';
import { withStyles } from 'material-ui/styles';
import { Link } from 'react-router-dom';

import genericBook from './../../Search/SearchResult/generic-book.png';
import './HorizontalBooksList.css';

const styles = theme => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
    },
    gridList: {
      flexWrap: 'nowrap',
      // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
      transform: 'translateZ(0)',
    },
    title: {
      color: theme.palette.primary.light,
    },
    titleBar: {
      background:
        'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
  });

const HorizontalBooksList = (props) => {
    const {
        title = '',
        books = [],
        classes
    } = props;

    function getThumbnail(book) {
        let thumbnailUrl = book.volumeInfo && book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.smallThumbnail;
        return thumbnailUrl ? thumbnailUrl.replace(/^http:\/\//i, 'https://') : '';
    }

    return (
        <div className="book-list">
            <h3>{ title }</h3>
            <GridList className={classes.gridList} cols={2.5}>
                {books.map(book => (
                    <GridListTile key={book.id}>
                        <Link to={`/book/${book.id}`}>
                            {<img className="book-detail-image" src={getThumbnail(book) || genericBook} alt={book.volumeInfo.title} />}
                        </Link>
                    </GridListTile>
                ))}
            </GridList>
        </div>
    )
}

export default withStyles(styles)(HorizontalBooksList);
