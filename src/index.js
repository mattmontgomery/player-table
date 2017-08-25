import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';

import reducers from './reducers';

const store = createStore(combineReducers(reducers));

window.store = store;

try {
    const players = require('./results.json');
    store.dispatch({
        type: 'PLAYERS_INGEST_RAW',
        payload: players
    });
} catch(e) {}

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
registerServiceWorker();
