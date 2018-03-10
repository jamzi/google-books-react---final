import React from 'react';
import ReactDOM from 'react-dom';
import * as Raven from 'raven-js';

import './index.css';
import 'normalize.css';

import App from './components/App/App';
import registerServiceWorker from './registerServiceWorker';

const packageJson = require('./../package.json');

if (process.env.NODE_ENV !== 'development') {
    console.log('ENVIORNMENT ', process.env.NODE_ENV);
    Raven.config('https://c8f1d49a987e419d9d57319fcbe61bac@sentry.io/290581', { release: packageJson.version }).install();
}

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
