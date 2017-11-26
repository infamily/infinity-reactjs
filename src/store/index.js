import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import UserReducer from '../reducers/user';

const configureStore = () => {
  const store = createStore(
    UserReducer,
    composeWithDevTools(applyMiddleware(thunk))
  );

  return store;
}

export default configureStore;
