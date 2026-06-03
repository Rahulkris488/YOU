const express = require('express');
const { authenticate } = require('../../middleware/auth.middleware');
const validateRequest = require('../../validators/validateRequest');
const cardsController = require('./cards.controller');
const { createCardSchema } = require('./cards.validator');

const router = express.Router();

router.get('/', authenticate, cardsController.listCards);
router.post('/', authenticate, validateRequest(createCardSchema), cardsController.createCard);

module.exports = router;

