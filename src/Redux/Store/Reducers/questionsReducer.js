import {
  SET_SELECTED_QUESTION,
  SET_USERS_POLL_QUESTIONS,
  SET_SHOW_POLL_DETAILS,
  SET_SELECTED_POLL_OPTION,
  FETCH_QUESTIONS,
  UPDATE_QUESTIONS,
  SAVE_QUESTION,
  SAVE_QUESTION_ANSWER,
  CREATE_ALERT,
  FORMAT_USERS_POLLS,
} from '../Actions/questionsAction';

const initialState = {
  questions: [],
  question: {},
  leaderboard: {},
  category: 'unanswered',
  showAlert: { message: '', show: false },
  usersPollQuestions: {},
  usersPolls: {},
  showPollDetails: false,
  selectedPollOption: null,
};

export default function questions (state = initialState, action) {
  switch (action.type) {
    case CREATE_ALERT:
      return {
        ...state,
        showAlert: action.payload,
      };
    case SET_SHOW_POLL_DETAILS:
      return {
        ...state,
        showPollDetails: action.payload,
      };
    case FORMAT_USERS_POLLS:
      return {
        ...state,
        usersPolls: action.payload,
      };

    case SET_SELECTED_POLL_OPTION:
      return {
        ...state,
        selectedPollOption: action.payload,
      };
    case SET_SELECTED_QUESTION:
      return {
        ...state,
        question: action.payload,
      };
    case SET_USERS_POLL_QUESTIONS:
      return {
        ...state,
        usersPollQuestions: action.payload,
      };
    case FETCH_QUESTIONS:
      return {
        ...state,
        questions: action.payload,
      };
    case UPDATE_QUESTIONS:
      return {
        ...state,
        questions: action.payload,
      };
    case SAVE_QUESTION:
      return {
        ...state,
        testQuestions: action.payload,
      };
    case SAVE_QUESTION_ANSWER:
      return {
        ...state,
        questions: action.payload,
      };

    default:
      return state;
  }
}
