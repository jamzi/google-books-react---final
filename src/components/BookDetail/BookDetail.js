import React, { Component } from 'react';
import { getBook, addBookToBookshelf } from '../../utils/books';
import { CircularProgress } from 'material-ui/Progress';
import Button from 'material-ui/Button';
import Dialog, { DialogActions, DialogContent } from 'material-ui/Dialog';
import Input, { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import { FormControl } from 'material-ui/Form';
import Select from 'material-ui/Select';
import { withStyles } from 'material-ui/styles';
import Snackbar from 'material-ui/Snackbar';
import IconButton from 'material-ui/IconButton';
import CloseIcon from 'material-ui-icons/Close';
import ReactGA from 'react-ga';

import './BookDetail.css';

const styles = theme => ({
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 200,
    }
});

class BookDetail extends Component {
    state = {
        isLoaded: false,
        bookInfo: {},
        dialogOpen: false,
        snackbarOpen: false,
        bookshelfId: '',
    }

    componentDidMount() {
        let bookId = this.props.match.params.bookId;

        getBook(bookId).then((bookInfo) => {
            this.setState({ bookInfo: bookInfo.volumeInfo, bookId: bookInfo.id, isLoaded: true });
        });
    }

    handleDialogOpen = () => {
        this.setState({ dialogOpen: true });
    };
    
    handleDialogInputChange = name => event => {
        this.setState({ [name]: Number(event.target.value) });
    };

    handleDialogClose = () => {
        this.setState({ dialogOpen: false });
        if (this.state.bookshelfId && this.state.bookshelfId !== -1) {
            addBookToBookshelf(this.state.bookshelfId, this.state.bookId).then((response) => {
                ReactGA.event({
                    category: 'Bookshelf',
                    action: `Add book to bookshelf #${this.state.bookshelfId}`,
                });
                this.setState({ snackbarOpen: true, bookshelfId: -1 });
            });
        }
    };

    handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({ snackbarOpen: false });
    };

    render() {
        const { isLoaded, bookInfo } = this.state;
        const { classes } = this.props;

        const authors = bookInfo && bookInfo.authors && bookInfo.authors.map((author, index) => {
            return <span key={index}>{author}</span>
        });
        const categories = bookInfo.categories && bookInfo.categories.map((category, index) => {
            return <span key={index}>{category}</span>
        });
        const strippedDescription = bookInfo && bookInfo.description && bookInfo.description.replace(/<(.|\n)*?>/g, '');
        if (!isLoaded) {
            return (
                <div className="spinner">
                    <CircularProgress />
                </div>);
        } else {
            return (
                <div className="book-detail">
                    <Button onClick={this.handleDialogOpen}>Add to bookshelf</Button>
                    <Dialog
                        disableBackdropClick
                        disableEscapeKeyDown
                        open={this.state.dialogOpen}
                        onClose={this.handleDialogClose}>
                        <DialogContent>
                            <form>
                                <FormControl className={classes.formControl}>
                                    <InputLabel htmlFor="bookshelfId-simple">Bookshelf name</InputLabel>
                                    <Select
                                        value={this.state.bookshelfId}
                                        onChange={this.handleDialogInputChange('bookshelfId')}
                                        input={<Input id="bookshelfId-simple" />}
                                        autoWidth>
                                        <MenuItem value={-1}><em>None</em></MenuItem>
                                        <MenuItem value={2}>To Read</MenuItem>
                                        <MenuItem value={3}>Reading Now</MenuItem>
                                        <MenuItem value={4}>Have Read</MenuItem>
                                    </Select>
                                </FormControl>
                            </form>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleDialogClose} color="primary">
                                Cancel
                            </Button>
                            <Button onClick={this.handleDialogClose} color="primary">
                                Add
                            </Button>
                        </DialogActions>
                    </Dialog>

                    <h1>{bookInfo.title}</h1><span>({bookInfo.publishedDate})</span>
                    <div>By: {authors ? authors : 'No authors to display'}</div>
                    <h3>{strippedDescription}</h3>
                    <div>Categories: {categories ? categories : 'No categories to display'}</div>

                    <Snackbar
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        open={this.state.snackbarOpen}
                        autoHideDuration={6000}
                        onClose={this.handleSnackbarClose}
                        SnackbarContentProps={{
                            'aria-describedby': 'message-id',
                        }}
                        message={<span id="message-id">Successfully added book to bookshelf</span>}
                        action={[
                            <IconButton
                                key="close"
                                aria-label="Close"
                                color="inherit"
                                className={classes.close}
                                onClick={this.handleSnackbarClose}
                            >
                                <CloseIcon />
                            </IconButton>,
                        ]}
                    />
                </div>
            )
        }
    }
}

export default withStyles(styles)(BookDetail);