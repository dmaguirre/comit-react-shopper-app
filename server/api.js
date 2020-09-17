const bcrypt = require('bcrypt');

const repository = require('./repository');


const SALT_ROUNDS = 10;

async function getItems(req, res, next) {
  const { offset = 0, limit = 25, tag } = req.query;

  try {
    const items = await repository.getItems();
    const resultItems = items
      .map((row) => ({ ...row, price: parseFloat(row.price.replace('$', '')) }))
      .slice(Number(offset), Number(offset) + Number(limit));
    res.json(resultItems);
  } catch (err) {
    next(err);
  }
}

async function getItem(req, res, next) {
  const id = Number(req.params.id);

  try {
    const item = await repository.getItem(id);
    if (item) {
      const resultItem = { ...item, price: parseFloat(item.price.replace('$', '')) };
      res.json(resultItem);
    } else {
      return next();
    }
  } catch (err) {
    next(err);
  }
}

async function createItem(req, res, next) {
  const itemData = req.body;
  try {
    const item = await repository.createItem(itemData);
    const resultItem = { ...item, price: parseFloat(item.price.replace('$', '')) };
    res.json(resultItem);
  } catch (err) {
    next(err);
  }
}

async function getCart(req, res) {
  res.json({ message: 'Resource not implemented yet' });
}

async function createUser(req, res, next) {
  const userData = req.body;
  try {
    const hashedPassword = await bcrypt.hash(userData.password, SALT_ROUNDS);
    const user = await repository.createUser({ ...userData, password: hashedPassword });
    res.json(user);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getItems,
  getItem,
  createItem,
  getCart,
  createUser,
};
