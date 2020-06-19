import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter} from 'react-router-dom'

// Redux
import {Provider} from 'react-redux'
import thunk from 'redux-thunk'
import {createStore , applyMiddleware} from 'redux'
import rootReducer from './store/rootreducer'
import { composeWithDevTools } from "redux-devtools-extension";
import * as actionCreators from "./store/actions/index";

const composeEnhancers = composeWithDevTools({
  actionCreators,
  trace: true,
  traceLimit: 25,
})

const store = createStore(
rootReducer,
composeEnhancers(
applyMiddleware(thunk))
)



ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
