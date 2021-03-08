import { composeWithDevTools } from 'redux-devtools-extension'
import { createStore, combineReducers } from 'redux'

import anecdoteReducer from './reducers/anecdoteReducer'
import notifReducer from './reducers/notifReducer'

const reducer = combineReducers({
  anecdotes: anecdoteReducer,
  notification: notifReducer
})

export const store = createStore(
  reducer,
  composeWithDevTools()
)