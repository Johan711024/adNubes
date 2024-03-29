import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk'

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import taskBuilderReducer from './store/reducers/taskBuilder';
import orderReducer from './store/reducers/order'
import authReducer from './store/reducers/auth'

const rootReducer = combineReducers({
    taskBuilder: taskBuilderReducer,
    order: orderReducer,
    auth: authReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    rootReducer, 
    composeEnhancers(applyMiddleware(thunk)));

const app = (
        <Provider store={store}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>
);

ReactDOM.render( app, document.getElementById( 'root' ) );
registerServiceWorker();
