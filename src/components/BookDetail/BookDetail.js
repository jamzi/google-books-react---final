import React, { Component } from 'react';
import { getBook, addBookToBookshelf, getBookshelfName } from '../../utils/books';
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
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Chip from 'material-ui/Chip';
import ExpansionPanel, {
    ExpansionPanelSummary,
    ExpansionPanelDetails,
} from 'material-ui/ExpansionPanel';
import Typography from 'material-ui/Typography';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';

const styles = theme => ({
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 200,
    },
    chip: {
        margin: theme.spacing.unit / 2,
    },
    expansionPanel: {
        marginTop: theme.spacing.unit,
        marginBottom: theme.spacing.unit
    },
    bookImage: {
        display: 'flex',
        margin: '10px auto'
    }
});

class BookDetail extends Component {
    state = {
        isLoaded: false,
        bookInfo: {},
        dialogOpen: false,
        snackbarOpen: false,
        snackbarMessage: '',
        bookshelfId: '',
    }

    componentDidMount() {
        let bookId = this.props.match.params.bookId;

        getBook(bookId).then((bookInfo) => {
            this.setState({ bookInfo: bookInfo.volumeInfo, bookId: bookInfo.id, isLoaded: true });
        });
    }

    handleDialogOpen = () => {
        this.setState({ dialogOpen: true, bookshelfId: -1 });
    };

    handleDialogInputChange = name => event => {
        this.setState({ [name]: Number(event.target.value) });
    };

    handleDialogClose = () => {
        this.setState({ dialogOpen: false });
        if (this.state.bookshelfId && this.state.bookshelfId !== -1) {
            addBookToBookshelf(this.state.bookshelfId, this.state.bookId).then((response) => {
                let bookshelfName = getBookshelfName(this.state.bookshelfId);
                ReactGA.event({
                    category: 'Bookshelf',
                    action: `Add book to ${bookshelfName}`,
                });
                this.setState({ snackbarOpen: true, snackbarMessage: `Successfully added book to ${bookshelfName}` });
            });
        }
    };

    handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({ snackbarOpen: false, snackbarMessage: '' });
    };

    render() {
        const { isLoaded, bookInfo } = this.state;
        const { classes } = this.props;

        const authors = getAuthorList(bookInfo);

        const categories = bookInfo.categories && bookInfo.categories.map((category, index) => {
            return <Chip key={index} label={category} className={classes.chip} />
        });
        const strippedDescription = bookInfo && bookInfo.description && bookInfo.description.replace(/<(.|\n)*?>/g, '');

        let amazonSearchUrl = '';
        if (isLoaded && bookInfo && bookInfo.title && bookInfo.authors) {
            const amazonSearchUrlBase = 'https://www.amazon.com/s/field-keywords=';
            const title = bookInfo.title.split(' ').join('+');
            const authors = bookInfo.authors.join(' ').split(' ').join('+');
            amazonSearchUrl = `${amazonSearchUrlBase}${title}+${authors}`;
        }

        function getSmallImage(bookInfo) {
            let bookImageUrl = bookInfo.imageLinks && (bookInfo.imageLinks.small || bookInfo.imageLinks.thumbnail);
            return bookImageUrl ? bookImageUrl.replace(/^http:\/\//i, 'https://') : '';
        }

        function getAuthorList(bookInfo) {
            let authorList = bookInfo.authors;
            if (!authorList) {
                return <span>No authors to display</span>;
            }
            return authorList.map((author, index) => {
                return <span key={index}>{author}{index + 1 !== authorList.length ? ', ' : ''}</span>;
            });
        }    

        if (!isLoaded) {
            return (
                <div className="spinner">
                    <CircularProgress />
                </div>);
        } else {
            return (
                <div className="book-detail">
                    <Button className="buy-on-amazon" variant="raised" color="primary" href={amazonSearchUrl} target="_blank">Buy on amazon</Button>
                    <Button className="add-to-bookshelf" onClick={this.handleDialogOpen}>Add to bookshelf</Button>
                    <CopyToClipboard text={window.location.href}
                        onCopy={() => {
                            this.setState({ snackbarOpen: true, snackbarMessage: 'Link copied to clipboard' });
                        }}>
                        <Button className="create-link" >Create link</Button>
                    </CopyToClipboard>
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
                            <Button className="cancel-add-to-dialog" onClick={this.handleDialogClose} color="primary">
                                Cancel
                            </Button>
                            <Button className="confirm-add-to-dialog" onClick={this.handleDialogClose} color="primary">
                                Add
                            </Button>
                        </DialogActions>
                    </Dialog>

                    <h1>{bookInfo.title}</h1><span>({bookInfo.publishedDate})</span>
                    <div>By: {authors}</div>
                    <ExpansionPanel className={classes.expansionPanel}>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography className={classes.heading}>Description</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <Typography>{strippedDescription}</Typography>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                    {<img className={classes.bookImage} src={getSmallImage(bookInfo)} alt={bookInfo.title} />}
                    <div>Categories: {categories ? categories : 'No categories to display'}</div>

                    <Snackbar
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        open={this.state.snackbarOpen}
                        autoHideDuration={4000}
                        onClose={this.handleSnackbarClose}
                        SnackbarContentProps={{
                            'aria-describedby': 'message-id',
                        }}
                        message={<span id="message-id">{this.state.snackbarMessage}</span>}
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