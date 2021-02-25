const { response, request } = require("express");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();

app.use(cors());
morgan.token("postContent", (req, res) => {
  if (req.method === "POST" || req.method === "PUT") {
    return JSON.stringify(req.body);
  }
  return null;
});
app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :postContent"
  )
);
app.use(express.json());

let persons = [
  {
    name: "Arto Hellas",
    number: "040-123456",
    id: 1,
  },
  {
    name: "Ada Lovelace",
    number: "39-44-5323523",
    id: 2,
  },
  {
    name: "Dan Abramov",
    number: "12-43-234345",
    id: 3,
  },
  {
    name: "Mary Poppendieck",
    number: "39-23-6423122",
    id: 4,
  },
];

app.get("/info", (request, response) => {
  response.send(
    `<p>Phonebook has info for ${persons.length} people</p>${new Date()}<p></p>`
  );
});

app.get("/api/persons", (request, response) => {
  response.json(persons);
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((person) => person.id === id);
  person ? response.json(person) : response.status(404).end();
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const initialPersons = persons.length;

  persons = persons.filter((person) => person.id !== id);

  const statusCode = persons.length === initialPersons ? 404 : 204;
  response.status(statusCode).end();
});

app.post("/api/persons", (request, response) => {
  const { name, number } = request.body;

  if (!name || !number) {
    return response.status(400).send({ message: "content missing" });
  }

  if (persons.some((person) => person.name === name)) {
    return response.status(400).send({
      message: `${name} already exist`,
    });
  }

  const person = {
    name: name,
    number: number,
    id: Math.floor(Math.random() * 1000000000),
  };

  persons = persons.concat(person);

  response.json(person);
});

app.put("/api/persons/:id", (request, response) => {
  const updatedPerson = {
    name: request.body.name,
    number: request.body.number,
    id: Number(request.params.id),
  };

  if (persons.some((person) => person.id === updatedPerson.id)) {
    persons = persons.map((person) =>
      person.id === updatedPerson.id ? updatedPerson : person
    );
    console.log("Update OK -->", persons);
    return response.status(200).json(updatedPerson);
  } else {
    console.log("Update FAIL -->", persons);
    return response.status(500).end();
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
