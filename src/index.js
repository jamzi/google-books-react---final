import React from 'react';
import ReactDOM from 'react-dom';
import * as Raven from 'raven-js';

import './index.css';
import 'normalize.css';

import App from './components/App/App';

const packageJson = require('./../package.json');

if (process.env.NODE_ENV !== 'development') {
    Raven.config('https://c8f1d49a987e419d9d57319fcbe61bac@sentry.io/290581', { release: packageJson.version }).install();
}

ReactDOM.render(<App />, document.getElementById('root'));
