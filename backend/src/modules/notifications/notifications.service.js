const Notification = require('./notifications.model');

async function createNotification(userId, payload) {
  return Notification.create({
    userId,
    ...payload,
  });
}

async function listNotifications(userId) {
  return Notification.find({ userId }).sort({ createdAt: -1 });
}

module.exports = {
  createNotification,
  listNotifications,
};

