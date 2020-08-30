const { Client } = require("pg");

const { credentials } = require("../.env.dev.json");
const { connectionString } = credentials.postgres;

console.log(connectionString);

const client = new Client({ connectionString });

const createScript = `
CREATE TABLE IF NOT EXISTS items (
  name varchar(200) NOT NULL UNIQUE,
  category varchar(50),
  image_url varchar(50),
  description text,
  price money,
  tags jsonb,
  available boolean,
  quantity integer,
  notes text
)`;

client.connect().then(async () => {
  try {
    console.log("Creating database schema");
    await client.query(createScript);
  } catch (err) {
    console.log(err.message);
  } finally {
    client.end();
  }
});
