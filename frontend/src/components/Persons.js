const Person = ({ id, name, number, handleDelete }) => {
  return (
    <div>
      {name} {number}
      <button onClick={() => handleDelete(id)} >delete</button>
    </div>
  )
}

const Persons = ({ persons, deletePerson }) => {
  return (
    <div>
      {persons.map(person =>
        <Person
          key={person.name}
          id={person.id}
          name={person.name}
          number={person.number}
          handleDelete={deletePerson}
        />
      )}
    </div>
  )
}

export default Persons
