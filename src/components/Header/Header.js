import React, { Component } from 'react';
import firebase from '@firebase/app';
import '@firebase/auth';
import { NavLink } from 'react-router-dom';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import Drawer from 'material-ui/Drawer';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Divider from 'material-ui/Divider';

class Header extends Component {
    constructor(props) {
        super(props);

        this.state = {
            redirectToReferrer: false,
            drawerOpened: false
        }

        this.onLogOut = this.onLogOut.bind(this);
        this.toggleDrawer = this.toggleDrawer.bind(this);
    }

    onLogOut() {
        firebase.auth().signOut()
            .then(() => {
                localStorage.removeItem('access_token');
                console.log('User successfully signed out');
            })
            .catch(err => {
                console.log(err);
            });
    }

    toggleDrawer() {
        this.setState({ drawerOpened: !this.state.drawerOpened });
    }

    render() {
        return (
            <AppBar position="static" color="default">
                <Toolbar>
                    <IconButton color="inherit" aria-label="Menu" onClick={this.toggleDrawer}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="title" color="inherit">
                        Google Books React
                    </Typography>
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
                            <NavLink to="/login " style={{ textDecoration: 'none', color: 'unset' }} >
                                <ListItem button>
                                    <ListItemText primary="Login" />
                                </ListItem>
                            </NavLink >
                        </List>
                    </div>
                </Drawer>
            </AppBar>
        )
    }
}

export default Header;