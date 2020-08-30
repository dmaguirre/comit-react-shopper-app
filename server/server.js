const express = require("express");
const bodyParser = require("body-parser");

const api = require("./api");
const errorHandling = require("./middleware/errorHandling");

const port = 4000;

const app = express();

app.use(bodyParser.json());
app.get("/items", api.getItems);
app.get("/items/:id", api.getItem);
app.post("/items", api.createItem);
app.put("/items/:id", api.updateItem);
app.delete("/items/:id", api.deleteItem);
app.use(errorHandling.handleError);
app.use(errorHandling.notFound);

app.listen(port, () => console.log(`Listening on port ${port}`));
