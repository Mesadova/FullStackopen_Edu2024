import { useState } from 'react'

const Button = ({handleEvent, text}) => {
  return(
    <button onClick={handleEvent}>{text}</button>
  )
}

const Statistics = ({text, value}) => {
  return(
    <p>
      {text}: {value}
    </p>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)

  const handleGood = () => {
    setGood(good + 1)
    setTotal(total + 1)
  }

  const handleNeutral = () => {
    setNeutral(neutral + 1)
    setTotal(total + 1)
  }

  const handleBad = () => {
    setBad(bad + 1)
    setTotal(total + 1)
  }

  const average = () => ((good) + (neutral * 0) + (bad * -1)) / total + ' %'

  const positive = () => (good / (total)) * 100

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleEvent={handleGood} text='good'/>
      <Button handleEvent={handleNeutral} text='neutral'/>
      <Button handleEvent={handleBad} text='bad'/>
      <h1>statistics</h1>
      <Statistics text='good' value={good}/>
      <Statistics text='neutral' value={neutral}/>
      <Statistics text='bad' value={bad}/>
      <Statistics text='total' value={total}/>
      <Statistics text='average' value={average()}/>
      <Statistics text='positive' value={positive()}/>
    </div>
  )
}

export default App