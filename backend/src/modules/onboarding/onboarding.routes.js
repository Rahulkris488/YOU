const express = require('express');
const { authenticate } = require('../../middleware/auth.middleware');
const validateRequest = require('../../validators/validateRequest');
const onboardingController = require('./onboarding.controller');
const { saveIdentitySchema } = require('./onboarding.validator');

const router = express.Router();

router.get('/identity', authenticate, onboardingController.getIdentity);
router.put('/identity', authenticate, validateRequest(saveIdentitySchema), onboardingController.saveIdentity);

module.exports = router;

