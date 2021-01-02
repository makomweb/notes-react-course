import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import createSagaMiddleware from 'redux-saga';

import BurgerBuilderReducer from './Store/Reducers/BurgerBuilder';
import OrderReducer from './Store/Reducers/Order';
import AuthReducer from './Store/Reducers/Auth';
import { watchAll, watchBurgerBuilder, watchOrder } from './Store/Sagas';

const devMode = process.env.NODE_ENV === 'development';
const composeEnhancers = devMode ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;
const rootReducer = combineReducers({
    burgerBuilder: BurgerBuilderReducer,
    order: OrderReducer,
    auth: AuthReducer
});

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
    rootReducer,
    composeEnhancers(
        applyMiddleware(thunk, sagaMiddleware)
    )
);

sagaMiddleware.run(watchAll);
sagaMiddleware.run(watchBurgerBuilder);
sagaMiddleware.run(watchOrder);

const MyApp = (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);

ReactDOM.render(MyApp, document.getElementById('root'));
registerServiceWorker();