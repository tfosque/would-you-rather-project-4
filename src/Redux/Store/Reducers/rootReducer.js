import { combineReducers } from 'redux';
import users from './usersReducer';
import questions from './questionsReducer';
import menu from './menuReducer';

export default combineReducers({
  users,
  questions,
  menu,
});
