const express = require("express");
const jsonServer = require("json-server");
const cors = require("cors");

const authMiddleware = require("./authMiddleware.js");
const data = require("../data/items.json");

const app = express();

app.use(cors());
app.use(jsonServer.bodyParser);
app.use(authMiddleware);

app.get("/items", (req, resp) => {
  resp.json(data.items);
});

app.get("/cart", (req, resp) => {
  resp.json(data.cart);
});

app.listen(4000, () => console.log("Listening on port 4000"));
