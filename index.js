const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const app = express();

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

let data = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/api/persons", (request, response) => {
  response.json(data); // Send a response to the client, stablishing the content type as text/HTML
});

app.get("/api/info", (request, response) => {
  const date = new Date().toString();
  const entries = data.length;
  return response.send(
    `<h3>Phonebook has info for ${entries} people</h3><br/><p>${date}</p>`
  ); // Send a response to the client, stablishing the content type as text/HTML
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = data.find((person) => person.id === id);
  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
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
  const randomId = Math.floor(Math.random() * 1000);

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "Name or number missing",
    });
  } else if (data.find((person) => person.name === body.name)) {
    return response.status(400).json({
      error: "Name must be unique",
    });
  }

  const person = {
    id: randomId,
    name: body.name,
    number: body.number,
  };

  data = data.concat(person);
  response.status(201).json(person);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
