const express = require("express");

const { getItems, getItem, getCart } = require("./api");
const { handleError, notFound } = require("./middleware/errorHandling");

const app = express();

app.get("/items", getItems);
app.get("/items/:id", getItem);
app.get("/cart", getCart);
app.use(handleError);
app.use(notFound);

app.listen(4000, () => console.log("Running server on port 4000"));
