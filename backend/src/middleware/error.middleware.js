const env = require('../config/env');

function errorMiddleware(error, _req, res, _next) {
  const statusCode = error.statusCode || 500;
  const payload = {
    status: 'error',
    message: error.message || 'Internal server error',
  };

  if (error.details) {
    payload.details = error.details;
  }

  if (env.nodeEnv === 'development') {
    payload.stack = error.stack;
  }

  res.status(statusCode).json(payload);
}

module.exports = errorMiddleware;

