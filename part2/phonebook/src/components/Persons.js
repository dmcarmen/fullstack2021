import react from 'react'

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
      {filt.map(person => <Person person = {person} key={person.id}/>)}
    </div>
)}

export default Persons