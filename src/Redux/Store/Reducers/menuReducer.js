import { SET_ACTIVE_LINK, SET_CATEGORY } from '../Actions/menuAction'


const initialState = {
  activeLink: null,
  category: null,
}

export default function menu (state = initialState, action) {
  switch (action.type) {
    case SET_ACTIVE_LINK:
      return {
        ...state,
        activeLink: action.payload
      }
    case SET_CATEGORY:
      return {
        ...state,
        category: action.payload
      }

    default:
      return state
  }
}
