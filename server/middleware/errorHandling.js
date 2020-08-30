function handleError(err, req, res, next) {
  console.error(err);

  if (res.headersSent) {
    return next(err);
  }

  res.status(500).json({ error: err.message });
}

function notFound(req, res) {
  res.status(404).json({ error: "Not found" });
}

module.exports = { handleError, notFound };
