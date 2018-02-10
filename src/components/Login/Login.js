import React, { Component } from 'react';
import {
    Redirect
} from 'react-router-dom';
import firebase from '@firebase/app';
import '@firebase/auth';

import './Login.css';

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            redirectToReferrer: false
        }

        this.onLogin = this.onLogin.bind(this);
    }

    onLogin() {
        let provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope('https://www.googleapis.com/auth/books');

        firebase.auth().signInWithPopup(provider)
            .then((response) => {
                const accessToken = response.credential.accessToken;
                localStorage.setItem('access_token', accessToken);

                this.setState({ redirectToReferrer: true});
            })
            .catch(err => {
                console.log(err);
            });
    }

    render() {
        const { redirectToReferrer } = this.state;

        if (redirectToReferrer) {
            return (
                <Redirect to={'/'} />
            )
        }
        return (
            <div>
                <p>You must log in to view the page</p>
                <button onClick={this.onLogin}>Log In</button>            
            </div>
        )
    }
}

export default Login;