import { useState, useEffect } from 'react'
import axios from 'axios'
import personService from './services/persons'

const Filter = (props) => {
  return(
    <div>
          filter shown with: <input value={props.value} onChange={props.onChange}/>
    </div>
  )
}

const PersonForm = ({ handleAddPerson, newName, newNumber, handleNameChange, handleNumberChange }) => {
  return(
    <form onSubmit={handleAddPerson}>
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
        <p key={person.id}>{person.name} {person.number}<button onClick={() => props.deletePerson(person)}>delete</button></p>
        
      )
    ) : (
      props.filteredPersons.map(person => 
        <p key={person.id}>{person.name} {person.number}</p>
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
    personService
      .showAll()
      .then(showPersons => {
        setPersons(showPersons)
      })
  }, [])

  const handleAddPerson = (event) => {
    event.preventDefault()
    if (persons.some(person => person.name === newName)){
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
        const personNewNumber = persons.find(person => person.name === newName)
        const personObject = { ...personNewNumber, number: newNumber}
        personService
          .update(personNewNumber.id, personObject)
          .then(returnedPerson => {
            setPersons(persons.map(a => a.id === personNewNumber.id ? returnedPerson : a))
            setFilteredPersons(filteredPersons.map(a => a.id === personNewNumber.id ? returnedPerson : a))
          })
      } else {
        alert(`${newName} is already added to the phonebook`)
      }
    } else {
      const personObject = {
        name: newName,
        number: newNumber
      }
      personService
        .create(personObject)
        .then(addedPerson => {
          setPersons(persons.concat(addedPerson))
        })
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

  const deletePerson = (person) => {
    const personIdDelete = person.id
    if (window.confirm(`Delete ${person.name}?`)){
      personService
        .deletePerson(personIdDelete)
        .then(() => {
          setPersons(persons.filter(person => person.id !== personIdDelete))
          setFilteredPersons(persons.filter(person => person.id !== personIdDelete))
        })
    }
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={nameFilter} onChange={handleFilterChange} />
      <h2>add a new</h2>
      <PersonForm handleAddPerson={handleAddPerson} newNumber={newNumber} newName={newName} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <Persons nameFilter={nameFilter} persons={persons} filteredPersons={filteredPersons} deletePerson={deletePerson}/>
    </div>
  )
}

export default App