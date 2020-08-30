const dataPath = "../../data/items.json";

async function list() {
  return await require(dataPath);
}

module.exports = { list };
