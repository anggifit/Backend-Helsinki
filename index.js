require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const app = express();

const Person = require("./models/person");

// Middleware
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
app.use(cors());
app.use(express.static("dist"));
app.use(express.json());

// Routes
app.get("/api/persons", (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons);
  });
});

app.get("/api/info", (request, response) => {
  const date = new Date().toString();
  Person.find({}).then((persons) => {
    const entries = persons.length;
    response.send(
      `<h3>Phonebook has info for ${entries} people</h3><br/><p>${date}</p>`
    ); // Send a response to the client, stablishing the content type as text/HTML
  });
});

app.get("/api/persons/:id", (request, response) => {
  Person.findById(request.params.id).then((person) => {
    response.json(person);
  });
});

app.delete("/api/persons/:id", (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then((result) => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

app.post("/api/persons", (request, response) => {
  const body = request.body;

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "Name or number missing",
    });
  }

  Person.find({}) // Busca en la base de datos, es una promesa
    .then((persons) => {
      if (persons.find((person) => person.name === body.name)) {
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
});

// Middleware para manejar rutas no encontradas

// Middleware para manejar errores
const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  }
  next(error);
};

app.use(errorHandler);

// Server
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
