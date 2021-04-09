import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {applyMiddleware, createStore} from 'redux';
import {rootReducer} from './reducers/rootReducer';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

const middlware = [thunk,logger]

export const mystore=createStore(rootReducer, applyMiddleware(...middlware));

console.log(mystore,"hgyfuyfiuyfiuyf");

   ReactDOM.render(
   <Provider store={mystore}>
   <App />
   </Provider>
   ,document.getElementById('root')
);

