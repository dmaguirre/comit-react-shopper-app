const fs = require("fs").promises;

const dataPath = "./data/items.json";

async function getItems(req, res, next) {
  const { offset = 0, limit = 25, tag } = req.query;

  try {
    const data = await fs.readFile(dataPath);
    const items = JSON.parse(data).items;
    const filteredItems = items
      .filter((item) => !tag || item.tags.includes(tag))
      .slice(Number(offset), Number(offset) + Number(limit));
    res.json(filteredItems);
  } catch (err) {
    next(err);
  }
}

async function getItem(req, res, next) {
  const { id } = req.params;

  try {
    const data = await fs.readFile(dataPath);
    const items = JSON.parse(data).items;
    const item = items.find((item) => item.id === Number(id));
    if (item) {
      res.json(item);
    } else {
      return next();
    }
  } catch (err) {
    next(err);
  }
}

async function getCart(req, res) {
  const data = await fs.readFile(dataPath);
  const cart = JSON.parse(data).cart;
  res.json(cart);
}

module.exports = {
  getItems,
  getItem,
  getCart,
};
