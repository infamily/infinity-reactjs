import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import './index.css';
import configureStore from './store';
import App from './components/app';
import registerServiceWorker from './registerServiceWorker'; 
import serverService from './services/server.service';

const store = configureStore();

serverService.getDefault().then(() => {
  ReactDOM.render(
    <Provider store={store} >
      <App />
    </Provider>,
  document.getElementById('root'));
});

// registerServiceWorker();
