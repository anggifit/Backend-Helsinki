require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const app = express();

const Person = require("./models/person");

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.static("dist"));

app.use(
  morgan(function (tokens, req, res) {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, "content-length"),
      "-",
      tokens["response-time"](req, res),
      "ms",
      req.method === "POST" ? JSON.stringify(req.body) : "-",
    ].join(" ");
  })
);

// Routes
app.get("/api/persons", (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons);
  });
});

app.get("/api/info", (request, response) => {
  const date = new Date().toString();
  const entries = data.length;
  return response.send(
    `<h3>Phonebook has info for ${entries} people</h3><br/><p>${date}</p>`
  ); // Send a response to the client, stablishing the content type as text/HTML
});

app.get("/api/persons/:id", (request, response) => {
  Person.findById(request.params.id).then((person) => {
    response.json(person);
  });
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = data.find((person) => person.id === id);

  if (person) {
    const newData = data.filter((person) => person.id !== id);
    response.json(newData);
  } else {
    response.status(404).end();
  }
});

app.post("/api/persons", (request, response) => {
  const body = request.body;

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "Name or number missing",
    });
  } else if (
    Person.find({}).then((persons) =>
      persons.find((person) => person.name === body.name)
    )
  ) {
    return response.status(400).json({
      error: "Name must be unique",
    });
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person.save().then((savedPerson) => {
    response.status(201).json(savedPerson);
  });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
