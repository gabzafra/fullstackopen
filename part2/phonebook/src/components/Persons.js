import React from 'react'

const Persons = ({persons,filter}) => {
    return (
        <table>
        <tbody>
          {persons
            .filter((person) => person.name.toUpperCase().includes(filter.toUpperCase()))
            .map((person) => (
              <tr key={person.name}>
                <td>{person.name}</td>
                <td>{person.number}</td>
              </tr>
            ))}
        </tbody>
      </table>
    )
}

export default Persons