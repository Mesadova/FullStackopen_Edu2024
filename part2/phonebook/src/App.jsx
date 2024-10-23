import { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = (props) => {
  return(
    <div>
          filter shown with: <input value={props.value} onChange={props.onChange}/>
    </div>
  )
}

const PersonForm = ({ handleNewNames, newName, newNumber, handleNameChange, handleNumberChange }) => {
  return(
    <form onSubmit={handleNewNames}>
      <div>
        name: <input value={newName} onChange={handleNameChange}/>
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNumberChange}/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Persons = (props) => {
  return(
    props.nameFilter === '' ? (
      props.persons.map(person => 
        <p key={person.name}>{person.name} {person.number}</p>
      )
    ) : (
      props.filteredPersons.map(person => 
        <p key={person.name}>{person.name} {person.number}</p>
      )
    )
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameFilter, setNameFilter] = useState('')
  const [filteredPersons, setFilteredPersons] = useState([])

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        const persons_db = response.data
        setPersons(persons_db)
      })
  }, [])

  const handleNewNames = (event) => {
    event.preventDefault()
    if (persons.some(person => person.name === newName)){
      alert(`${newName} is already added to the phonebook`)
    } else {
      setPersons(persons.concat({name: newName, number: newNumber}))
    }
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    const updatedSearch = event.target.value
    setNameFilter(updatedSearch)
    const re = new RegExp('^' + updatedSearch, 'i')
    const filteredPersonsCopy = persons.filter((person) => person.name.search(re) != -1)
    setFilteredPersons(filteredPersonsCopy)
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={nameFilter} onChange={handleFilterChange} />
      <h2>add a new</h2>
      <PersonForm handleNewNames={handleNewNames} newNumber={newNumber} newName={newName} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <Persons nameFilter={nameFilter} persons={persons} filteredPersons={filteredPersons} />
    </div>
  )
}

export default App