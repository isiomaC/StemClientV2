import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './redux/reducers';

const middleware = [thunk];

const intialState = {}

const devTools =
  process.env.NODE_ENV === "production"
    ? applyMiddleware(...middleware)
    : composeWithDevTools(applyMiddleware(...middleware));

const store = createStore(
  rootReducer,
  intialState,
  devTools//composeWithDevTools(applyMiddleware(...middleware))
);

export default store;

