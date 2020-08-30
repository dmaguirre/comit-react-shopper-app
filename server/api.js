const Items = require("./models/items");

async function getItems(req, res, next) {
  const { offset = 0, limit = 25, tag } = req.query;

  try {
    const data = await Items.list();
    const filteredData = data
      .filter((item, i) => !tag || item.tags.includes(tag))
      .slice(Number(offset), Number(offset) + Number(limit));
    res.json(filteredData);
  } catch (err) {
    return next(err);
  }
}

async function getItem(req, res, next) {
  const { id } = req.params;

  try {
    const item = await Items.get(Number(id));

    if (!item) return next({ message: "Item not found" });
    res.json(item);
  } catch (err) {
    return next(err);
  }
}

module.exports = { getItems, getItem };
