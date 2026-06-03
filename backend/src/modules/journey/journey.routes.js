const express = require('express');
const { authenticate } = require('../../middleware/auth.middleware');
const validateRequest = require('../../validators/validateRequest');
const journeyController = require('./journey.controller');
const { createJourneyEntrySchema } = require('./journey.validator');

const router = express.Router();

router.get('/', authenticate, journeyController.listEntries);
router.post('/', authenticate, validateRequest(createJourneyEntrySchema), journeyController.createEntry);

module.exports = router;

