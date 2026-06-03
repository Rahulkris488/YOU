const express = require('express');
const { authenticate } = require('../../middleware/auth.middleware');
const validateRequest = require('../../validators/validateRequest');
const journalController = require('./journal.controller');
const { createJournalSchema } = require('./journal.validator');

const router = express.Router();

router.get('/', authenticate, journalController.listJournals);
router.post('/', authenticate, validateRequest(createJournalSchema), journalController.createJournal);

module.exports = router;

