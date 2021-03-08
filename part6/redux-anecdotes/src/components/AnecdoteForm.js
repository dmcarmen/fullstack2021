import React from 'react'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { notifChange } from '../reducers/notifReducer'
import { connect } from 'react-redux'

const NewAnecdote = (props) => {
  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    props.createAnecdote(content)
    props.notifChange(`created anecdote '${content}'`, 5)
  }

  return (
    <form onSubmit={addAnecdote}>
        <div><input name="anecdote"/></div>
        <button type="submit">create</button>
    </form>
  )
}

const mapDispatchToProps = {
  createAnecdote,
  notifChange
}

const ConnectedNewAnecdote = connect(null, mapDispatchToProps)(NewAnecdote)
export default ConnectedNewAnecdote