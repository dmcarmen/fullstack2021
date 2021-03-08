const notifReducer = (state = null, action) => {
  console.log(action)
  switch (action.type) {
    case 'SET_NOTIF':
      return action.notif
    case 'EMPTY':
      return null
    default:
      return state
  }
}

export const notifChange = (notif, time) => {
  return dispatch => {
    dispatch({
      type: 'SET_NOTIF',
      notif,
    })
    setTimeout(() => {
      dispatch(notifEmpty())
    }, time*1000)
  }
}

export const notifEmpty = () => {
  return {
    type: 'EMPTY'
  }
}

export default notifReducer