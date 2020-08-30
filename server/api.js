const Items = require("./models/items");

async function getItems(req, res) {
  const { offset = 0, limit = 25, tag } = req.query;

  try {
    const data = await Items.list();
    const filteredData = data
      .filter((item, i) => !tag || item.tags.includes(tag))
      .slice(Number(offset), Number(offset) + Number(limit));
    res.json(filteredData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function getItem(req, res, next) {
  const { id } = req.params;

  try {
    const item = await Items.get(Number(id));

    if (!item) return next();
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { getItems, getItem };
