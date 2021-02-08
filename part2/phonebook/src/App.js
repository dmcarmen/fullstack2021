import React, { useState, useEffect } from 'react'
import axios from 'axios'
import PersonForm from './components/PersonForm'
import FilterForm from './components/FilterForm'
import Persons from './components/Persons'
import personService from './services/persons'
import Notification from './components/Notification'


const App = () => {
  const [persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filterText, setFilterText] = useState('')
  const [notifMessage, setNotifMessage] = useState(null)

  const addPerson = (event) => {
    const names = persons.map(e => e.name)

    event.preventDefault()
    if(names.includes(newName)){
      window.alert(`${newName} is already added to phonebook`);
    } else {
      const personObject = {
        name: newName,
        number: newNumber
      }
      personService
      .create(personObject)
      .then(returnedPerson => {
        setNotifMessage(`Added ${returnedPerson.name}`)
        setTimeout(() => {
          setNotifMessage(null)
        }, 5000)
        setPersons(persons.concat(returnedPerson))
      })
    }
    setNewNumber('')
    setNewName('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleFilterChange = (event) => {
    setFilterText(event.target.value)
  }

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const eraseEntry = (person) => {
    personService.erase(person)
    setPersons(persons.filter(n => n.id !== person.id))
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notifMessage} />
      <FilterForm
        filterTextValue = {filterText} 
        filterTextOnChange= {handleFilterChange}
      />
      <h2>add a new</h2>
      <PersonForm 
        onSubmit={addPerson} 
        nameValue={newName}
        nameOnChange={handleNameChange}
        numberValue={newNumber}
        numberOnChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons persons = {persons} filterText={filterText} eraseEntry={eraseEntry}/>
    </div>
  )
}

export default App
