import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import reduceCounter from './store/reducers/counter';
import reduceResults from './store/reducers/result';
import counterControl from './components/CounterControl/CounterControl';

const rootReducer = combineReducers({
    counter: reduceCounter,
    results: reduceResults
});

const logger = store => {
    return next => {
        return action => {
            console.log('[Middleware] dispatching', action);
            const result = next(action);
            console.log('[Middleware] next state', store.getState());
            return result;
        }
    }
}

const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
