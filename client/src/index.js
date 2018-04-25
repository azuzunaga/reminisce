import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import configureStore from './store/store';

import App from './components/App';

// const store = createStore(reducers, {}, applyMiddleware(...middlewares));
const store = configureStore();
window.axios = require("axios");

ReactDOM.render(
  <Provider store={store}><App /></Provider>,
  document.getElementById("root")

);
