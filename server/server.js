const express = require("express");
const data = require("../data/items.json");

const app = express();

app.get("/items", (req, res) => {
  try {
    res.json(data.items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(4000, () => console.log("Listening on port 4000"));
