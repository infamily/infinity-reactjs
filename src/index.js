import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import './index.css';
import configureStore from './store';
import App from './scenes/App';
import serverService from './services/server.service';
// import registerServiceWorker from './registerServiceWorker'; 
// registerServiceWorker();

const store = configureStore();

serverService.getDefault().then(() => {
  ReactDOM.render(
    <Provider store={store} >
      <App />
    </Provider>,
  document.getElementById('root'));
});

