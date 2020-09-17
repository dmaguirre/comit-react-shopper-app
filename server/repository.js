const { Pool } = require('pg');

const connectionString = process.env.CONNECTION_STRING;
const pool = new Pool({ connectionString });

async function getItems() {
    const { rows } = await pool.query('SELECT * FROM items');
    return rows;
}

async function getItem(id) {
    const { rows } = await pool.query(`SELECT * FROM items WHERE id = ${id}`);
    return rows[0];
}

async function createItem(item) {
    const { rows } = await pool.query(`INSERT INTO items (name, description, price) VALUES ('${item.name}', '${item.description}', ${item.price}) RETURNING *`);
    return rows[0];
}

async function createUser(user) {
    const { rows } = await pool.query(`INSERT INTO users (username, email, password) VALUES ('${user.username}', '${user.email}', '${user.password}') RETURNING id, username, email`);
    return rows[0];
}

module.exports = {
  getItems,
  getItem,
  createItem,
  createUser,
};
