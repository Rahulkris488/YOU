const { verifyJwt } = require('../config/jwt');
const { User } = require('../modules/user/user.model');
const { ApiError } = require('../utils/ApiError');
const { asyncHandler } = require('../utils/asyncHandler');

const requireAuth = asyncHandler(async (req, _res, next) => {
  const header = req.headers.authorization;

  if (!header || !header.startsWith('Bearer ')) {
    throw new ApiError(401, 'Authentication token is required');
  }

  const token = header.replace('Bearer ', '');
  const payload = verifyJwt(token);
  const user = await User.findById(payload.sub).select('-passwordHash');

  if (!user) {
    throw new ApiError(401, 'Authenticated user no longer exists');
  }

  req.user = user;
  next();
});

module.exports = { requireAuth };

