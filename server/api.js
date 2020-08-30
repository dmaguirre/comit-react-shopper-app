const Items = require("./models/items");

async function getItems(req, res) {
  const { offset = 0, limit = 25 } = req.query;

  try {
    const data = await Items.list();
    res.json(data.items.slice(Number(offset), Number(offset) + Number(limit)));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { getItems };
