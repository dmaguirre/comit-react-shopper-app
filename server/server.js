const express = require("express");

const port = 4000;
const dataPath = "../data/items.json";

const app = express();

app.get("/items", getItems);

app.listen(port, () => console.log(`Listening on port ${port}`));

async function getItems(req, res) {
  try {
    const data = await require(dataPath);
    res.json(data.items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
