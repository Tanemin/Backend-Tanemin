const express = require('express');
const { protect, generateAccess } = require('../authentications/handler');
const {
  getAllNotifications,
  createNotification,
  getNotificationById,
  updateNotificationById,
  deleteNotificationById,
} = require('./handler');

const NotificationRouter = express.Router({ mergeParams: true });

NotificationRouter.route('/')
  .get(protect, getAllNotifications)
  .post(protect, generateAccess('administrator'), createNotification);

NotificationRouter.route('/:id')
  .get(protect, generateAccess('administrator'), getNotificationById)
  .patch(protect, generateAccess('administrator'), updateNotificationById)
  .delete(protect, generateAccess('administrator'), deleteNotificationById);

module.exports = NotificationRouter;
