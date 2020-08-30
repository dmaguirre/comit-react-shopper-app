const Items = require("./models/items");

async function getItems(req, res) {
  try {
    const data = await Items.list();
    res.json(data.items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { getItems };
