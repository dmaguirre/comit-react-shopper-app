const express = require("express");
const fs = require("fs").promises;

const app = express();

app.get("/items", getItems);

app.get("/cart", (req, res) => {
  const data = require("../data/items.json");
  const cart = data.cart;
  res.json(cart);
});

app.listen(4000, () => console.log("Running server on port 4000"));

async function getItems(req, res) {
  const { offset = 0, limit = 25 } = req.query;

  const data = await fs.readFile("./data/items.json");
  console.log(data);
  const items = JSON.parse(data).items;
  console.log(items);
  res.json(items);
}
