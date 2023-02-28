import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/app/app';
import reportWebVitals from './reportWebVitals';
import { rootReducer } from './services/reducers/index';
import { compose, createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { BrowserRouter } from 'react-router-dom';
import { socketMiddleware } from './services/middleware/socket-Middleware';
import {  WS_CONNECTION_START,
          WS_CONNECTION_SUCCESS, 
          WS_CONNECTION_CLOSED, 
          WS_CONNECTION_BREAK, 
          WS_CONNECTION_ERROR } from './services/actions/socket-Middleware';
import { SAVE_ALL_ORDERS } from './services/actions/orders';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
const composeEnhancers =
  typeof window === 'object' && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;
const wsActions = {
  start: WS_CONNECTION_START,
  success: WS_CONNECTION_SUCCESS, 
  closed: WS_CONNECTION_CLOSED, 
  break: WS_CONNECTION_BREAK, 
  error: WS_CONNECTION_ERROR,
  onMessage: SAVE_ALL_ORDERS,
};
const enhancer = composeEnhancers(applyMiddleware(thunk, socketMiddleware(wsActions)));

const store = createStore(rootReducer, enhancer);

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();