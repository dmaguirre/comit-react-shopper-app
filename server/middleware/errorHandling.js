function handleError(err, req, res, next) {
  console.log(err.message);
  res.status(500).json({ error: err.message });
}

function notFound(req, res, next) {
  res.status(404).json({ error: "Could not find requested resource" });
}

module.exports = { handleError, notFound };
