const fs = require("fs").promises;

const dataPath = "./data/items.json";

async function list() {
  const data = await fs.readFile(dataPath);
  return JSON.parse(data).items;
}

async function get(id) {
  const data = await fs.readFile(dataPath);
  return JSON.parse(data).items.find((item) => item.id === id);
}

module.exports = { list, get };
