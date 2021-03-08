import React from 'react'
import AnecdoteForm from './components/AnecdoteForm'
import Anecdotes from './components/AnecdoteList'
import Notification from './components/Notification'

const App = () => {
  return (
    <div>
      <Notification />
      <h2>Anecdotes</h2>
      <Anecdotes/>
      <h2>create new</h2>
      <AnecdoteForm/>
    </div>
  )
}

export default App