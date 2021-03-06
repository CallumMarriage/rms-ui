import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './main/App';
import * as serviceWorker from './serviceWorker';
import {Provider} from "react-redux";
import {applyMiddleware, createStore} from "redux";
import reducers from "./main/reducers";
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import {BrowserRouter, Route} from "react-router-dom";

const loggerMiddleware = createLogger();

const store = createStore(reducers,
    applyMiddleware(
        thunkMiddleware,
        loggerMiddleware
    ));

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                <Route component={App}/>
            </Provider>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
