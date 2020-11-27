import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './Containers/App.js';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App appTitle="Persons Manager" />, document.getElementById('root'));
registerServiceWorker();
