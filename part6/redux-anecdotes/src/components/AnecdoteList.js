import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changeVote } from '../reducers/anecdoteReducer'
import { notifChange, notifEmpty } from '../reducers/notifReducer'

const Anecdote = ({ anecdote, handleClick }) => {
  return(
    <div key={anecdote.id}>
        <p>{anecdote.content}</p>
        <p>
            has {anecdote.votes}
            <button onClick={handleClick}>vote</button>
        </p>
    </div>
  )
}

const Anecdotes = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state.anecdotes)

  const vote = (anecdote) => {
    dispatch(changeVote(anecdote))

    dispatch(notifChange(`You voted for '${anecdote.content}'`))
    setTimeout(() => {
      dispatch(notifEmpty())
    }, 5000)
  }

  return(
    <ul>
      {anecdotes.sort((a, b) => b.votes - a.votes)
        .map(anecdote =>
            <Anecdote
                key={anecdote.id}
                anecdote={anecdote}
                handleClick={() => 
                  vote(anecdote)
                }
            />
      )}
    </ul>
  )
}

export default Anecdotes