import React from 'react';
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

const App = () => {
  const dispatching = (type) => {
    store.dispatch({
      type: type
    })
  }


  return (
    <div>
      <button onClick={() => dispatching('GOOD')}>good</button> 
      <button onClick={() => dispatching('OK')}>neutral</button> 
      <button onClick={() => dispatching('BAD')}>bad</button>
      <button onClick={() => dispatching('ZERO')}>reset stats</button>
      <div>good {store.getState().good}</div>
      <div>neutral {store.getState().ok}</div>
      <div>bad {store.getState().bad}</div>
    </div>
  )
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)