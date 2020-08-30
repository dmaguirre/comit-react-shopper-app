function handleError(err, req, res, next) {
  console.error(err);

  if (res.headersSent) {
    return next(err);
  }

  res.status(500).json({ error: err.message });
}

module.exports = { handleError };
