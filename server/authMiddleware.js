const jwt = require("jsonwebtoken");
const sqlite3 = require("sqlite3").verbose();

const anonOperations = [{ method: "GET", urls: ["/items"] }];

const APP_SECRET = "appsecret";

let db = new sqlite3.Database(
  "C:/Users/PC/Documents/GitHub/ComIT-React/comit-react/React/shopper/data/users.db",
  sqlite3.OPEN_READWRITE,
  (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log("Connected to the users database.");
    }
  }
);

module.exports = (req, resp, next) => {
  console.log("Authenticating");

  // check if operation requires login
  if (
    anonOperations.find(
      (op) =>
        op.method === req.method &&
        op.urls.find((url) => req.url.startsWith(url))
    )
  ) {
    next();
  }

  // check if operation is login request
  else if (req.url === "/login" && req.method === "POST") {
    const { username, password } = req.body;
    if (findMatch(username, password)) {
      const token = jwt.sign({ data: username, expiresIn: "1h" }, APP_SECRET);
      setUsersToken(username, token);
      resp.json({ success: true, token });
    } else {
      resp.json({ success: false });
    }
    resp.end();
  }

  // authenticate
  else {
    const authHeader = req.headers["authorization"];
    if (authHeader != null && authHeader.startsWith("Bearer<")) {
      const token = authHeader.substring(7, authHeader.length - 1);
      console.log(token);
      jwt.verify(token, APP_SECRET);
      next();
    } else {
      // authentication failed
      resp.statusCode = 401;
      resp.end();
    }
  }
};

function findMatch(username, password) {
  const sql = `SELECT * FROM users`;
  db.all(sql, [], (err, rows) => {
    if (err) {
      throw err;
    }
    rows.forEach((row) => {
      console.log(row.username);
    });
  });
  return true;
}

function setUsersToken(username, token) {
  const sql = `UPDATE users SET token = ? WHERE username = ?;`;
  db.run(sql, [token, username], (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log(`Updated row`);
  });
}
