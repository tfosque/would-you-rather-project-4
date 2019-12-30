import { _getQuestions, _saveQuestionAnswer, _saveQuestion } from '../Data/_Data';

import { updateUsers } from '../Actions/usersAction';

export const SET_SELECTED_QUESTION = 'SET_SELECTED_QUESTION';
export const SET_USERS_POLL_QUESTIONS = 'SET_USERS_POLL_QUESTIONS';
export const SET_SELECTED_POLL_OPTION = 'SET_SELECTED_POLL_OPTION';
export const SET_SHOW_POLL_DETAILS = 'SET_SHOW_POLL_DETAILS';
export const FETCH_QUESTIONS = 'FETCH_QUESTIONS';
export const SAVE_QUESTION = 'SAVE_QUESTION';
export const SAVE_QUESTION_ANSWER = 'SAVE_QUESTION_ANSWER';
export const CREATE_ALERT = 'CREATE_ALERT';
export const UPDATE_QUESTIONS = 'UPDATE_QUESTIONS';
export const FORMAT_USERS_POLLS = 'FORMAT_USERS_POLLS'


export function createAlert (payload) {
  return {
    type: CREATE_ALERT,
    payload,
  };
}

export function setShowPollDetails (payload) {
  return {
    type: SET_SHOW_POLL_DETAILS,
    payload,
  };
}

export function formatUsersPolls (payload) {
  return {
    type: FORMAT_USERS_POLLS,
    payload,
  };
}

export function fetchQuestions () {
  return function (dispatch) {
    dispatch({
      type: FETCH_QUESTIONS,
      payload: _getQuestions().then((res) => {
        return dispatch({
          type: UPDATE_QUESTIONS,
          payload: Object.values(res),
        });
      }),
    });
  };
}

export function updateQuestions (payload, author) {
  return (dispatch) => {
    dispatch({
      type: UPDATE_QUESTIONS,
      payload: Object.values(payload),
    });
  };
}

export function saveQuestion (question) {
  return (dispatch) => {
    dispatch({
      type: SAVE_QUESTION,
      payload: _saveQuestion(question).then((res) => {
        dispatch(updateQuestions(res.questions, question.author));
        dispatch(updateUsers(res.users));
      }),
    });
  };
}

export function saveQuestionAnswer (result) {
  return (dispatch) => {
    _saveQuestionAnswer(result).then(({ users, questions }) => {
      dispatch(updateUsers(users));
      dispatch(updateQuestions(questions));
    });
  };
}

export function setSelectedQuestion (question, option) {
  return function (dispatch) {
    dispatch({
      type: SET_SELECTED_QUESTION,
      payload: question,
    });
    dispatch(setSelectedPollOption(option));
  };
}

function setSelectedPollOption (option) {
  return function (dispatch) {
    dispatch({
      type: SET_SELECTED_POLL_OPTION,
      payload: option,
    });
  };
}
