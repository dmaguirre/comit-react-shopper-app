const jwt = require("jsonwebtoken");

const anonOperations = [{ method: "GET", urls: ["/items"] }];

const APP_SECRET = "appsecret";

let users = {
  Mark: { password: "a", token: null },
};

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
  if (req.url === "/login" && req.method === "POST") {
    const { username, password } = req.body;
    if (findMatch(username, password)) {
      const token = jwt.sign({ data: username, expiresIn: "1h" }, APP_SECRET);
      users[username] = {
        password,
        token,
      };
      console.log(users[username]);
      resp.json({ success: true, token });
    } else {
      resp.json({ success: false });
    }
    resp.end();
  }

  // authenticate
  const authHeader = req.headers["authorization"];
  if (authHeader != null && authHeader.startsWith("Bearer<")) {
    const token = authHeader.substring(7, authHeader.length - 1);
    jwt.verify(token, APP_SECRET);
    next();
  }

  // authentication failed
  resp.statusCode = 401;
  resp.end();
};

function findMatch(username, password) {
  return users[username].password === password;
}
