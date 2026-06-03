const { env } = require('../config/env');

function notFoundHandler(req, _res, next) {
  const error = new Error(`Route not found: ${req.method} ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
}

function errorHandler(error, _req, res, _next) {
  const statusCode = error.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    message: error.message || 'Internal server error',
    details: error.details,
    stack: env.nodeEnv === 'production' ? undefined : error.stack,
  });
}

module.exports = { errorHandler, notFoundHandler };

