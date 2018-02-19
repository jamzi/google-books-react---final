import React from 'react';
import ReactDOM from 'react-dom';
import 'typeface-roboto';

import './index.css';
import 'normalize.css';

import App from './components/App/App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
