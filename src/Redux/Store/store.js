import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './Reducers/rootReducer';

export default function configureStore(initialState = {}) {
  return createStore(
    rootReducer,
    (initialState = {}),
    compose(applyMiddleware(thunk)),
  );
}
