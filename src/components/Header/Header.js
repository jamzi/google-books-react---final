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
            drawerOpened: false,
            userData: {}
        }

        this.onLogOut = this.onLogOut.bind(this);
        this.toggleDrawer = this.toggleDrawer.bind(this);
    }

    componentDidMount() {
        const userKey = Object.keys(localStorage)
            .filter(it => it.startsWith('firebase:authUser'))[0];
        const user = userKey ? JSON.parse(localStorage.getItem(userKey)) : undefined;

        this.setState({ userData: user });
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
        const { classes } = this.props;
        const { userData } = this.state;

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
                        userData ? 
                            <Avatar alt="Google profile image" src={userData && userData.photoURL} /> :
                            <NavLink to="/login " style={{ textDecoration: 'none', color: 'unset' }} >
                                <div>Login</div>
                            </NavLink >
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

export default withStyles(styles)(Header);