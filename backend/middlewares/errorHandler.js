function errorHandler(err, _req, res, _next) {
  console.error("🔥", err);
  const status = res.statusCode && res.statusCode !== 200 ? res.statusCode : err.statusCode || 500;
  res.status(status).json({
    message: err.message || "Server error",
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
}

module.exports = errorHandler;
