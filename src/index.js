import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import axios from 'axios';

import './index.css';
import configureStore from './store';
import App from './scenes/App';
import serverService from './services/server.service';

// import registerServiceWorker from './registerServiceWorker'; 
// registerServiceWorker();

const store = configureStore();

/* Set up axios request interceptor for adding authorization header */
axios.interceptors.request.use(config => {
  const user = store.getState().user;
  const token = user && user.token;
  
  if (token && config.headers['Authorization'] !== null) {
    config.headers['Authorization'] = `Token ${token}`
  }
  return config;
});

serverService.getDefault().then(() => {
  ReactDOM.render(
    <Provider store={store} >
      <App />
    </Provider>,
  document.getElementById('root'));
});

