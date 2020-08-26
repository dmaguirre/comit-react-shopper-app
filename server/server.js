const express = require("express");
const jsonServer = require("json-server");
const cors = require("cors");

const authMiddleware = require("./authMiddleware.js");
const data = require("../data/items.json");

const app = express();

const router = jsonServer.router(data);

app.use(cors());
app.use(jsonServer.bodyParser);
app.use(authMiddleware);
app.use("/", (req, resp, next) => router(req, resp, next));

app.listen(4000, () => console.log("Listening on port 4000"));
