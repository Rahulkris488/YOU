const express = require('express');
const { authenticate } = require('../../middleware/auth.middleware');
const validateRequest = require('../../validators/validateRequest');
const roadmapController = require('./roadmap.controller');
const { createRoadmapSchema } = require('./roadmap.validator');

const router = express.Router();

router.get('/', authenticate, roadmapController.listRoadmaps);
router.post('/', authenticate, validateRequest(createRoadmapSchema), roadmapController.createRoadmap);

module.exports = router;

