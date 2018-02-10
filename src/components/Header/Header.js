import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import firebase from '@firebase/app';
import '@firebase/auth';

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

                this.setState({ isAuthenticated: false});
            })
            .catch(err => {
                console.log(err);
            });
    } 

    render() {
        const { isAuthenticated, user } = this.props;

        return (
            <div>
                { isAuthenticated ? 
                    <div>
                        <div>Hello {user.displayName}</div>
                        <button onClick={this.onLogOut}>Log Out</button>
                    </div>:
                    <span>Hello Stranger</span>}
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/search">Search</Link></li>
                    <li><Link to="/recommended">Recommended</Link></li>
                </ul>
            </div>
        )
    }
}

export default Header;