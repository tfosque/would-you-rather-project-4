import {
  FETCH_USERS,
  RECEIVE_USERS,
  CREATE_USER,
  SET_USER_LOGGED_IN,
  UPDATE_USERS,
  SET_ALL_SCORES,
  SET_USER_AVATAR_URL,
  SET_REDIRECT
} from '../Actions/usersAction';

const initialState = {
  users: {},
  user: {},
  userLoggedIn: { id: null, name: null },
  questions: [],
  loggedIn: [],
  score: [],
  allScores: [],
  userAvatarUrl: null,
  redirect: {}
};

export default function users (state = initialState, action) {
  switch (action.type) {
    case FETCH_USERS:
      return {
        ...state,
        users: action.payload,
      };
    case RECEIVE_USERS:
      return {
        ...state,
        users: action.payload,
      };
    case SET_REDIRECT:
      return {
        ...state,
        redirect: action.payload,
      };
    case CREATE_USER:
      return {
        ...state,
        users: action.payload,
      };
    case SET_USER_AVATAR_URL:
      return {
        ...state,
        userAvatarUrl: action.payload,
      };
    case SET_ALL_SCORES:
      return {
        ...state,
        allScores: action.payload,
      };
    case UPDATE_USERS:
      return {
        ...state,
        users: action.payload,
      };

    case SET_USER_LOGGED_IN:
      return {
        ...state,
        userLoggedIn: action.payload,
        user: action.payload,
      };

    default:
      return state;
  }
}
