const express = require('express');
const { authenticate } = require('../../middleware/auth.middleware');
const validateRequest = require('../../validators/validateRequest');
const userController = require('./user.controller');
const { updateProfileSchema } = require('./user.validator');

const router = express.Router();

router.get('/me', authenticate, userController.getMe);
router.patch('/me', authenticate, validateRequest(updateProfileSchema), userController.updateMe);

module.exports = router;

