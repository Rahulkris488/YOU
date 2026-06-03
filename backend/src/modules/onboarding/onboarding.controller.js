const asyncHandler = require('../../utils/asyncHandler');
const onboardingService = require('./onboarding.service');

const saveIdentity = asyncHandler(async (req, res) => {
  const identity = await onboardingService.upsertIdentity(req.user.id, req.validated.body);
  res.json({ data: identity });
});

const getIdentity = asyncHandler(async (req, res) => {
  const identity = await onboardingService.getIdentity(req.user.id);
  res.json({ data: identity });
});

module.exports = {
  saveIdentity,
  getIdentity,
};

