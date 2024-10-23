import { useState } from 'react'

const Button = ({handleEvent, text}) => {
  return(
    <button onClick={handleEvent}>{text}</button>
  )
}

const Statistics = (props) => {
  return(
    <table>
      <StatisticLine text='good' value={props.good}/>
      <StatisticLine text='neutral' value={props.neutral}/>
      <StatisticLine text='bad' value={props.bad}/>
      <StatisticLine text='total' value={props.total}/>
      <StatisticLine text='average' value={props.average}/>
      <StatisticLine text='positive' value={props.positive}/>
    </table>
  )
}

const StatisticLine = ({text, value}) => {
  return(
    <tr>
      <td>{text}:</td>
      <td>{value}</td>
    </tr>
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
      {total === 0 ? (
        <p>No feedback given</p>
      ) : (
          <Statistics good={good} bad={bad} neutral={neutral} total={total} average={average()} positive={positive()}/>
      )}
    </div>
  )
}

export default App