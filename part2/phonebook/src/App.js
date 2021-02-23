import React, { useState, useEffect } from "react";
import personService from "./services/persons";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newSearch, setNewSearch] = useState("");
  const [errorMessage, setErrorMessage] = useState({ text: null, type: null });

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const addPerson = (event) => {
    event.preventDefault();

    const personObj = {
      name: newName.trim(),
      number: newNumber.trim(),
    };

    const oldPerson = persons.find(
      (person) => person.name.localeCompare(newName) === 0
    );

    if (!oldPerson) {
      personService.create(personObj).then((returnedPerson) => {
        if (!returnedPerson.message) {
          setPersons(persons.concat(returnedPerson));
          setErrorMessage({
            text: `Added ${returnedPerson.name}`,
            type: "success",
          });
          setTimeout(() => setErrorMessage({ text: null, type: null }), 5000);
          setNewName("");
          setNewNumber("");
        } else {
          setErrorMessage({
            text: returnedPerson.message,
            type: "error",
          });
          setTimeout(() => setErrorMessage({ text: null, type: null }), 5000);
        }
      });
    } else {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one ?`
        )
      ) {


        // TODO use a PUT to UPDATE <-----------------------------------------------------------------------!

        
        personService.update(oldPerson.id, personObj).then((returnedPerson) => {
          if (returnedPerson.hasOwnProperty("message")) {
            setPersons(persons.filter((p) => p.id !== oldPerson.id));
            setErrorMessage({ text: null, type: null });
            setErrorMessage({ text: returnedPerson.message, type: "error" });
            setTimeout(() => setErrorMessage({ text: null, type: null }), 5000);
          } else {
            setPersons(
              persons.map((p) => (p.id !== oldPerson.id ? p : returnedPerson))
            );
            setErrorMessage({
              text: `${returnedPerson.name} phone number changed to ${returnedPerson.number}`,
              type: "success",
            });
            setTimeout(() => setErrorMessage({ text: null, type: null }), 5000);
            setNewName("");
            setNewNumber("");
          }
        });
      }
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
        if (status === 204) {
          setPersons(persons.filter((p) => p.id !== id));
        } else {
          setPersons(persons.filter((p) => p.id !== id));
          setErrorMessage({ text: null, type: null });
          setErrorMessage({
            text: `Information of ${name} has already been removed from server `,
            type: "error",
          });
          setTimeout(() => setErrorMessage({ text: null, type: null }), 5000);
        }
      });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage.text} type={errorMessage.type} />
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
