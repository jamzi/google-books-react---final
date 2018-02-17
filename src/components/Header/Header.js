import React, { Component } from 'react';
import firebase from '@firebase/app';
import '@firebase/auth';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';

class Header extends Component {
    constructor(props) {
        super(props);

        this.state = {
            redirectToReferrer: false
        }

        this.onLogOut = this.onLogOut.bind(this);
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

    render() {
        return (
            <AppBar position="static" color="default">
                <Toolbar>
                    <Typography variant="title" color="inherit">
                        Google Books React
                    </Typography>
                </Toolbar>
            </AppBar>
        )
    }
}

export default Header;