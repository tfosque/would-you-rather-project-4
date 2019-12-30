export const SET_ACTIVE_LINK = 'SET_ACTIVE_LINK'
export const SET_CATEGORY = 'SET_CATEGORY'

export function setActiveLink (link) {
  return function (dispatch) {
    dispatch({
      type: SET_ACTIVE_LINK,
      payload: link
    })
  }
}

export function setCategory (category) {
  return function (dispatch) {
    dispatch({
      type: SET_CATEGORY,
      payload: category
    })
  }
}

