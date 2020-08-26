const express = require("express");
const jsonServer = require("json-server");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const data = require("./data/items.json");

const APP_SECRET = "appsecret";

let users = {};

const app = express();

const authMiddleware = (req, resp, next) => {
  console.log("Authenticating");
  next();
};

app.use(cors());
app.use(jsonServer.bodyParser);
app.use(authMiddleware);

app.get("/items", (req, resp) => {
  resp.json(data.items);
});

app.get("/cart", (req, resp) => {
  resp.json(data.cart);
});

app.post("/signup", (req, resp) => {
  const { username, password } = req.body;
  const token = jwt.sign({ data: username, expiresIn: "1h" }, APP_SECRET);
  users[username] = {
    password,
    token,
  };
  resp.json({ success: true, token });
});

app.post("/login", (req, resp) => {
  const { username, password } = req.body;
});

app.listen(4000, () => console.log("Listening on port 4000"));
