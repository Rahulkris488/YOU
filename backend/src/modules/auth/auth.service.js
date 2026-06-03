const bcrypt = require('bcryptjs');
const ApiError = require('../../utils/apiError');
const { signToken } = require('../../utils/jwt');
const User = require('../user/user.model');

function serializeUser(user) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    avatar: user.avatar,
    level: user.level,
    xp: user.xp,
  };
}

async function register(payload) {
  const existingUser = await User.findOne({ email: payload.email });

  if (existingUser) {
    throw new ApiError(409, 'Email is already registered');
  }

  const passwordHash = await bcrypt.hash(payload.password, 12);
  const user = await User.create({
    name: payload.name,
    email: payload.email,
    passwordHash,
  });

  const token = signToken({ sub: user.id });

  return {
    token,
    user: serializeUser(user),
  };
}

async function login(payload) {
  const user = await User.findOne({ email: payload.email }).select('+passwordHash');

  if (!user) {
    throw new ApiError(401, 'Invalid email or password');
  }

  const passwordMatches = await bcrypt.compare(payload.password, user.passwordHash);

  if (!passwordMatches) {
    throw new ApiError(401, 'Invalid email or password');
  }

  const token = signToken({ sub: user.id });

  return {
    token,
    user: serializeUser(user),
  };
}

module.exports = {
  register,
  login,
};

