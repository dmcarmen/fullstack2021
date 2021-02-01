import React, { useState } from 'react'

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Header = ({name}) => {
  return(
    <>
      <h1>{name}</h1>
    </>
  )
}

const Anecdote = ({anecdote, votes}) => {
  return(
    <>
      <p>
        {anecdote}
      </p>
      <p>
        has {votes} votes
      </p>
    </>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Uint8Array(anecdotes.length))
  
  const mostVoted = votes.indexOf(Math.max(...votes))

  const changeSelected = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length))
  }

  const voteThis = () => {
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
  }

  return (
    <div>
      <Header name = 'Anecdote of the day' />
      <Anecdote anecdote={anecdotes[selected]} votes={votes[selected]} />
      <Button handleClick={() => voteThis()} text="vote" />
      <Button handleClick={() => changeSelected()} text="next anecdote" />
      <Header name = 'Anecdote with most votes' />
      <Anecdote anecdote={anecdotes[mostVoted]} votes={votes[mostVoted]} />
    </div>
  )
}

export default App
