import React from 'react';
import ReactDOM from 'react-dom';
import firebase from '@firebase/app';

import './index.css';
import 'normalize.css';

import App from './components/App/App';
import registerServiceWorker from './registerServiceWorker';

firebase.initializeApp({
    apiKey: "AIzaSyCUp2sDxggenAoqMKc_KltpLQb1rcCjP5E",
    authDomain: "books-react.firebaseapp.com"
});

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
