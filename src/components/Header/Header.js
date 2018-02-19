import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import Drawer from 'material-ui/Drawer';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import { withStyles } from 'material-ui/styles';

const styles = {
    flex: {
        flex: 1,
    }
};

class Header extends Component {
    constructor(props) {
        super(props);

        this.state = {
            redirectToReferrer: false,
            drawerOpened: false
        }
        this.toggleDrawer = this.toggleDrawer.bind(this);
    }

    toggleDrawer() {
        this.setState({ drawerOpened: !this.state.drawerOpened });
    }

    render() {
        const { classes, userPhotoUrl } = this.props;

        return (
            <AppBar position="static" color="default">
                <Toolbar>
                    <IconButton color="inherit" aria-label="Menu" onClick={this.toggleDrawer}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="title" color="inherit" className={classes.flex}>
                        Google Books React
                    </Typography>
                    {
                        userPhotoUrl ? 
                            <Avatar alt="Google profile image" src={userPhotoUrl} onClick={this.onLogOut} />
                            : <div>Not logged in</div>
                    }
                </Toolbar>
                <Drawer open={this.state.drawerOpened} onClose={this.toggleDrawer}>
                    <div
                        role="button"
                        onClick={this.toggleDrawer}
                        onKeyDown={this.toggleDrawer}>
                        <List>
                            <NavLink to="/" style={{ textDecoration: 'none', color: 'unset' }} >
                                <ListItem button>
                                    <ListItemText primary="Home" />
                                </ListItem>
                            </NavLink >
                            <NavLink to="/search" style={{ textDecoration: 'none', color: 'unset' }} >
                                <ListItem button>
                                    <ListItemText primary="Search" />
                                </ListItem>
                            </NavLink >
                            <NavLink to="/recommended" style={{ textDecoration: 'none', color: 'unset' }} >
                                <ListItem button>
                                    <ListItemText primary="Recommended" />
                                </ListItem>
                            </NavLink >
                            <NavLink to="/bookshelves" style={{ textDecoration: 'none', color: 'unset' }} >
                                <ListItem button>
                                    <ListItemText primary="Bookshelves" />
                                </ListItem>
                            </NavLink >
                            <Divider />
                        </List>
                    </div>
                </Drawer>
            </AppBar>
        )
    }
}

export default withStyles(styles)(Header);