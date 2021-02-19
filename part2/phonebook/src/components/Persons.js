import React from "react";

const Persons = ({ persons, filter, deleteHandler }) => {
  return (
    <table>
      <tbody>
        {persons
          .filter((person) =>
            person.name.toUpperCase().includes(filter.toUpperCase())
          )
          .map((person) => (
            <tr key={person.name}>
              <td>{person.name}</td>
              <td>{person.number}</td>
              <td>
                <button onClick={() => deleteHandler(person.id, person.name)}>
                  delete
                </button>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default Persons;
