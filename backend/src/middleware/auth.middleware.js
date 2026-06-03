const ApiError = require('../utils/apiError');
const asyncHandler = require('../utils/asyncHandler');
const { verifyToken } = require('../utils/jwt');
const User = require('../modules/user/user.model');

const authenticate = asyncHandler(async (req, _res, next) => {
  const header = req.headers.authorization || '';
  const [scheme, token] = header.split(' ');

  if (scheme !== 'Bearer' || !token) {
    throw new ApiError(401, 'Authentication token is required');
  }

  const decoded = verifyToken(token);
  const user = await User.findById(decoded.sub).select('-passwordHash');

  if (!user) {
    throw new ApiError(401, 'Authenticated user no longer exists');
  }

  req.user = user;
  next();
});

module.exports = {
  authenticate,
};

