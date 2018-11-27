import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom';
import {combineReducers, createStore} from 'redux';
import tokenAct from './reducers/authReducer';
import issueReducer from './reducers/issueReducer';
import {Provider} from 'react-redux';
import HashRouter from "react-router-dom/es/HashRouter";
import singleReducer from "./reducers/singleReducer";

let reducers = combineReducers({
    tokenStore : tokenAct,
    issueStore : issueReducer,
    singleStore : singleReducer
});

const store = createStore(reducers);

ReactDOM.render(
    <Provider store={store}>
            <App/>
    </Provider>,
    document.getElementById('root')
);

