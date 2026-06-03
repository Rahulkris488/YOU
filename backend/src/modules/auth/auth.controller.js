const asyncHandler = require('../../utils/asyncHandler');
const authService = require('./auth.service');

const register = asyncHandler(async (req, res) => {
  const result = await authService.register(req.validated.body);
  res.status(201).json({ data: result });
});

const login = asyncHandler(async (req, res) => {
  const result = await authService.login(req.validated.body);
  res.json({ data: result });
});

module.exports = {
  register,
  login,
};

