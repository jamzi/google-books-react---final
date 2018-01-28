import React from 'react';
import { withRouter } from 'react-router-dom';
import { auth } from './../Common/API';

const AuthButton = withRouter(({ history }) => (
    auth.isAuthenticated() ? (
        <p>
            Welcome! <button onClick={() => {
                auth.signout();
                history.push('/');
            }}>Sign out</button>
        </p>
    ) : (
            <p>You are not logged in.</p>
        )
))

export default AuthButton;
