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

const Statistic = ({name, value}) => {
  return(
    <>
      <p>
        {name} {value}
      </p>
    </>
  )
}

const Statistics = (props) => {
  const total = props.good + props.bad + props.neutral;

  const avg = () => {
    let sum = props.good + props.bad*(-1);
    return sum/total;
  }

  const pos = () => {
    return props.good/total*100;
  }

  if(total === 0){
    return (
      <>
        No feedback given
      </>
    )
  }
  return(
    <>
      <Statistic name='good' value={props.good}/>
      <Statistic name='neutral' value={props.neutral}/>
      <Statistic name='bad' value={props.bad}/>
      <Statistic name='average' value= {avg()} />
      <Statistic name='positive' value={pos().toString().concat(' %')}/>
    </>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const plusOne = (val, setFunction) => {
    setFunction(val+1)
  }

  return (
    <div>
      <Header name = 'give feedback' />
      <Button handleClick={() => plusOne(good, setGood)} text="good" />
      <Button handleClick={() => plusOne(neutral, setNeutral)} text="neutral" />
      <Button handleClick={() => plusOne(bad, setBad)} text="bad" />
      <Header name = 'statistics' />
      <Statistics good = {good} bad = {bad} neutral={neutral} />

    </div>
  )
}

export default App
