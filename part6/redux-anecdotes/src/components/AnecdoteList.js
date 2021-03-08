import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changeVote } from '../reducers/anecdoteReducer'

const Anecdote = ({ anecdote, handleClick }) => {
  return(
    <div>
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
  const anecdotes = useSelector(state => state)

  return(
    <ul>
      {anecdotes.sort((a, b) => b.votes - a.votes)
        .map(anecdote =>
            <Anecdote
                key={anecdote.id}
                anecdote={anecdote}
                handleClick={() => 
                    dispatch(changeVote(anecdote.id))
                }
            />
      )}
    </ul>
  )
}

export default Anecdotes