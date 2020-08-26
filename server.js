const express = require("express");
const data = require("./data/items.json");

const app = express();

app.get("/items", (req, resp) => {
  resp.json(data.items);
});

app.listen(4000, () => console.log("Listening on port 4000"));
