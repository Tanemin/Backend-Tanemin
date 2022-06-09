const express = require('express');
const {
  getAllNotifications,
  createNotification,
  getNotificationById,
  updateNotificationById,
  deleteNotificationById,
} = require('./handler');

const NotificationRouter = express.Router();

NotificationRouter.route('/').get(getAllNotifications).post(createNotification);

NotificationRouter.route('/:id')
  .get(getNotificationById)
  .patch(updateNotificationById)
  .delete(deleteNotificationById);

module.exports = NotificationRouter;
