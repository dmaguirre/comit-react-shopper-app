const express = require("express");

const api = require("./api");

const port = 4000;

const app = express();

app.get("/items", api.getItems);
app.get("/items/:id", api.getItem);

app.listen(port, () => console.log(`Listening on port ${port}`));
