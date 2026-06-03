const ApiError = require('../../utils/apiError');

async function getProfile(user) {
  return user;
}

async function updateProfile(user, payload) {
  Object.assign(user, payload);
  await user.save();
  return user;
}

async function addXp(user, amount) {
  if (amount <= 0) {
    throw new ApiError(400, 'XP amount must be positive');
  }

  user.xp += amount;
  user.level = Math.max(1, Math.floor(user.xp / 100) + 1);
  await user.save();
  return user;
}

module.exports = {
  getProfile,
  updateProfile,
  addXp,
};

