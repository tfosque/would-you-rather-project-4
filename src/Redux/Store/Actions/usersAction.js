import { _getUsers, _createUser } from '../Data/_Data'

export const FETCH_USERS = 'FETCH_USERS'
export const RECEIVE_USERS = 'RECEIVE_USERS'
export const CREATE_USER = 'CREATE_USER'
export const SET_USER_LOGGED_IN = 'SET_USER_LOGGED_IN'
export const SET_ALL_SCORES = 'SET_ALL_SCORES'
export const SET_USER_AVATAR_URL = 'SET_USER_AVATAR_URL'
export const UPDATE_USERS = 'UPDATE_USERS'
export const SET_REDIRECT = 'SET_REDIRECT'

export function setUsersAvatarUrl (url) {
  return function (dispatch) {
    dispatch({
      type: SET_USER_AVATAR_URL,
      payload: url
    })
  }
}

export function createUser (newUser) {
  return function (dispatch) {
    dispatch({
      type: CREATE_USER,
      payload: _createUser(newUser)
        .then(response => response)
        .then(res => dispatch(updateUsers(res)))
    })
  }
}


export function setRedirect (poll) {
  return function (dispatch) {
    dispatch({
      type: SET_REDIRECT,
      payload: poll,
    })
  }
}

export function fetchUsers () {
  return function (dispatch) {
    dispatch({
      type: UPDATE_USERS,
      payload: _getUsers()
        .then(response => response)
        .then(res => dispatch(updateUsers(res)))
    })
  }
}

export function updateUsers (users) {
  return function (dispatch) {
    dispatch({
      type: UPDATE_USERS,
      payload: Object.values(users)
    })
  }
}

export function setUserLoggedIn (userLoggedIn) {
  const user = userLoggedIn.pop()

  return function (dispatch) {
    dispatch({
      type: SET_USER_LOGGED_IN,
      payload: user
    })
  }
}

export function setAllScores (scores) {
  return function (dispatch) {
    dispatch({
      type: SET_ALL_SCORES,
      payload: scores
    })
  }
}

