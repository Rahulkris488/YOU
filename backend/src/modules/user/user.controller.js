const asyncHandler = require('../../utils/asyncHandler');
const userService = require('./user.service');

const getMe = asyncHandler(async (req, res) => {
  const user = await userService.getProfile(req.user);
  res.json({ data: user });
});

const updateMe = asyncHandler(async (req, res) => {
  const user = await userService.updateProfile(req.user, req.validated.body);
  res.json({ data: user });
});

module.exports = {
  getMe,
  updateMe,
};

