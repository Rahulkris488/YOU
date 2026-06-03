const express = require('express');
const { authenticate } = require('../../middleware/auth.middleware');
const validateRequest = require('../../validators/validateRequest');
const notificationsController = require('./notifications.controller');
const { createNotificationSchema } = require('./notifications.validator');

const router = express.Router();

router.get('/', authenticate, notificationsController.listNotifications);
router.post(
  '/',
  authenticate,
  validateRequest(createNotificationSchema),
  notificationsController.createNotification,
);

module.exports = router;

