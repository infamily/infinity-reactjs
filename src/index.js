import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import axios from 'axios';
import App from 'scenes/App';
import configureStore from './store';
import './index.css';
// import registerServiceWorker from './registerServiceWorker';
// registerServiceWorker();

const store = configureStore();
/* Set up axios request interceptor for adding authorization header */
axios.interceptors.request.use(config => {
  const user = store.getState().user;
  const token = user && user.token;

  if (token && config.headers.Authorization !== null) {
    config.headers.Authorization = `Token ${token}`;
  }
  return config;
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
