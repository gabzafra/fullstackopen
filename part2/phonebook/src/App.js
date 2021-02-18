import React, { useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
    { name: "Ada Lovelace", number: "39-44-5323523" },
    { name: "Dan Abramov", number: "12-43-234345" },
    { name: "Mary Poppendieck", number: "39-23-6423122" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newSearch, setNewSearch] = useState("");

  const addPerson = (event) => {
    event.preventDefault();
    if (
      persons.every((person) => person.name.localeCompare(newName.trim()) !== 0)
    ) {
      const personObj = {
        name: newName,
        number: newNumber,
      };
      setPersons(persons.concat(personObj));
      setNewName("");
      setNewNumber("");
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
      <Persons persons={persons} filter={newSearch} />
    </div>
  );
};

export default App;
