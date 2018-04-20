import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { loadState, saveState } from './localStorage';
import reduces from '../reducers';

const persistedState = loadState();

const configureStore = () => {
  const store = createStore(
    reduces,
    persistedState,
    composeWithDevTools(applyMiddleware(thunk))
  );

  store.subscribe(() => {
    saveState(store.getState());
  });

  return store;
};

export default configureStore;
