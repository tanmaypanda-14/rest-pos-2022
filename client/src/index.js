import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import { rootReducer } from './redux/rootReducer';

const finalReducer = combineReducers({
  rootReducer: rootReducer
})

const initialState = {
  rootReducer: {
    cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []
  }
}


const store = createStore(finalReducer, initialState);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>
  <Provider store = {store}>
    <App />
  </Provider>
);
