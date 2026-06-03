const express = require('express');
const { authenticate } = require('../../middleware/auth.middleware');
const validateRequest = require('../../validators/validateRequest');
const aiController = require('./ai.controller');
const { generateSchema } = require('./ai.validator');

const router = express.Router();

router.post('/generate', authenticate, validateRequest(generateSchema), aiController.generate);

module.exports = router;

