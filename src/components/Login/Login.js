import React, { Component } from 'react';
import { GoogleLogin } from 'react-google-login';
import {
    Redirect
  } from 'react-router-dom';

import googleLoginButton from './btn-google-login.png';
import './Login.css';

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            redirectToReferrer: false
        }

        this.onSuccess = this.onSuccess.bind(this);
        this.onFailure = this.onFailure.bind(this);
    }

    onSuccess = (response) => {
        const { tokenId, accessToken } = response;
        localStorage.setItem('id_token', tokenId);
        localStorage.setItem('access_token', accessToken);
        this.setState({ redirectToReferrer: true });
    }

    onFailure = (response) => {
        console.log(response);
    }

    render() {
        const { from } = this.props.location.state || { from: { pathname: '/' } };
        const { redirectToReferrer } = this.state;

        if (redirectToReferrer) {
            return (
                <Redirect to={from} />
            )
        }
        return (
            <div>
                <p>You must log in to view the page at {from.pathname}</p>
                <GoogleLogin
                    clientId="727048091557-c1m6tcl1b21k6g2j61oikoa2d8caqd67.apps.googleusercontent.com"
                    scope="https://www.googleapis.com/auth/books"
                    onSuccess={this.onSuccess}
                    onFailure={this.onFailure}
                    className="google-login-button">
                    <img src={googleLoginButton} alt="google-login-button" />
                </GoogleLogin>
            </div>
        )
    }
}

export default Login;