import React, { useState, useEffect } from "react";
import personService from "./services/persons";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newSearch, setNewSearch] = useState("");

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const addPerson = (event) => {
    event.preventDefault();
    if (
      persons.every((person) => person.name.localeCompare(newName.trim()) !== 0)
    ) {
      const personObj = {
        name: newName,
        number: newNumber,
      };

      personService.create(personObj).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        setNewName("");
        setNewNumber("");
      });
    } else {
      alert(`${newName} is already added to phonebook`);
    }
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };
  const handleSearchChange = (event) => {
    setNewSearch(event.target.value);
  };

  const deletePerson = (id, name) => {
    if (window.confirm(`Delete ${name} ?`)) {
      personService.remove(id).then((status) => {
        if (status === 200) {
          setPersons(persons.filter((p) => p.id !== id));
        } else {
          alert(`Deletion of ${name} failed `);
        }
      });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterHandler={handleSearchChange} value={newSearch} />
      <h3>Add a new</h3>
      <PersonForm
        nameChangeHandler={handleNameChange}
        numberChangeHandler={handleNumberChange}
        name={newName}
        number={newNumber}
        submitHandler={addPerson}
      />
      <h2>Numbers</h2>
      <Persons
        persons={persons}
        filter={newSearch}
        deleteHandler={deletePerson}
      />
    </div>
  );
};

export default App;
