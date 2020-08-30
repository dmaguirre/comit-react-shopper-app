const fs = require("fs").promises;

const dataPath = "./data/items.json";

async function list() {
  const data = await fs.readFile(dataPath);
  return JSON.parse(data).items;
}

module.exports = { list };
