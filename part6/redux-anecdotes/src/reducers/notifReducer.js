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

export const notifChange = notif => {
  return {
    type: 'SET_NOTIF',
    notif,
  }
}

export const notifEmpty = () => {
  return {
    type: 'EMPTY'
  }
}

export default notifReducer