import react from 'react'

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Person = ({person}) => {
    return(
      <p>
        {person.name} {person.number}
      </p>
    )
  }

const Persons = ({persons, filterText, eraseEntry}) => {
    const filt = persons.filter(person => 
      person.name.toLowerCase().includes(filterText.toLowerCase()))
      
    return(
    <div>
      {filt.map(person => 
      {
        return(
          <div key={person.id}>
            <Person person={person} />
            <Button handleClick={() => eraseEntry(person)} text='delete'/>
          </div>
          )
      })}
    </div>
)}

export default Persons