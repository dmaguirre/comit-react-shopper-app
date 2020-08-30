const express = require("express");

const api = require("./api");
const errorHandling = require("./middleware/errorHandling");

const port = 4000;

const app = express();

app.get("/items", api.getItems);
app.get("/items/:id", api.getItem);
app.use(errorHandling.handleError);

app.listen(port, () => console.log(`Listening on port ${port}`));
