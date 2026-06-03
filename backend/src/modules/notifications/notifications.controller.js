const asyncHandler = require('../../utils/asyncHandler');
const notificationsService = require('./notifications.service');

const createNotification = asyncHandler(async (req, res) => {
  const notification = await notificationsService.createNotification(req.user.id, req.validated.body);
  res.status(201).json({ data: notification });
});

const listNotifications = asyncHandler(async (req, res) => {
  const notifications = await notificationsService.listNotifications(req.user.id);
  res.json({ data: notifications });
});

module.exports = {
  createNotification,
  listNotifications,
};

