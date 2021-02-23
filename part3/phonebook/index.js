const { response, request } = require("express");
const express = require("express");
const morgan = require("morgan");
const app = express();

morgan.token('postContent', (req,res)=> {
  if(req.method === 'POST'){
    return JSON.stringify(req.body)
  }
  return null
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :postContent' ));
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
  persons = persons.filter((person) => person.id !== id);
  response.status(204).end();
});

app.post("/api/persons", (request, response) => {
  const { name, number } = request.body;

  if (!name || !number) {
    return response.status(400).json({
      error: "content missing",
    });
  }

  if (persons.some((person) => person.name === name)) {
    return response.status(400).json({
      error: `${name} already exist`,
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

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
