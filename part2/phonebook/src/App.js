import React, { useState } from 'react'

const PersonForm = ({onSubmit, nameValue, nameOnChange, numberValue, numberOnChange}) => {
  return(
    <form onSubmit={onSubmit}>
      <div>
        name: <input value={nameValue} onChange={nameOnChange}/>
      </div>
      <div>
        number: <input value={numberValue} onChange={numberOnChange}/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const FilterForm = ({filterTextValue, filterTextOnChange}) => {
  return(
    <div>
      filter shown with: <input value={filterTextValue} onChange={filterTextOnChange}/>
    </div>
  )
}

const Person = ({person}) => {
  return(
    <p>
      {person.name} {person.number}
    </p>
  )
}

const Persons = ({persons, filterText}) => {
  const filt = persons.filter(person => 
    person.name.toLowerCase().includes(filterText.toLowerCase()))
  return(
  <div>
    {filt.map(person => <Person person = {person} key={person.name}/>)}
  </div>
)}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filterText, setFilterText] = useState('')

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
      setPersons(persons.concat(personObject))  
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

  return (
    <div>
      <h2>Phonebook</h2>
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
      <Persons persons = {persons} filterText={filterText}/>
    </div>
  )
}

export default App
