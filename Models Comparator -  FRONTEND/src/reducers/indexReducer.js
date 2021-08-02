import { combineReducers } from 'redux';
import users from './userReducer';
import models from './modelReducer';

const rootReducer = combineReducers({
  users,
  models,
});

export default rootReducer;