import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import homeActions from './homeActions';
import shopactions from './shopactions';
import shoppingcart from './shoppingcart';
import blogactions from './blogactions';


export default combineReducers({
  auth,
  alert,
  homeActions,
  shopactions,
  shoppingcart,
  blogactions
});
