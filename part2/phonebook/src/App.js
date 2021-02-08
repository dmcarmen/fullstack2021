import React, { useState, useEffect } from 'react'
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
  const [notifType, setNotifType] = useState('notif')


  const addPerson = (event) => {
    const names = persons.map(e => e.name)
    const personObject = {
      name: newName,
      number: newNumber
    }

    event.preventDefault()
    if(names.includes(newName)){
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
        const oldPerson = persons.filter(person => person.name===newName)
        const id = oldPerson[0].id
        personService
          .update(id, personObject).then(returnedPerson => {
              setPersons(persons.map(person => person.id !==  id ? person : returnedPerson))
            }).catch(error => {
              setNotifMessage(`Information of ${newName} has already been removed.`)
              setNotifType('error')
              setTimeout(() => {
                setNotifMessage(null)
              }, 5000)
              personService.getAll().then(initialPersons => {setPersons(initialPersons)})
            })
      }
    } else {
      personService
        .create(personObject)
        .then(returnedPerson => {
          setNotifMessage(`Added ${returnedPerson.name}`)
          setNotifType('notif')
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
      <Notification msg={notifMessage} msgType={notifType} />
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
      <Persons 
        persons = {persons} 
        filterText={filterText} 
        eraseEntry={eraseEntry}
      />
    </div>
  )
}

export default App
