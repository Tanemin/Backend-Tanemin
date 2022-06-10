/* eslint-disable consistent-return */
const AppError = require('../../exceptions/app-error');
const Notification = require('./validator');

const getAllNotifications = async (req, res, next) => {
  try {
    let filter = {};
    if (req.user) filter = { user: req.user.id };
    const notification = await Notification.find(filter);

    res.status(200).json({
      status: 'success',
      total: notification.length,
      result: notification,
    });
  } catch (error) {
    next(error);
  }
};

const createNotification = async (req, res, next) => {
  try {
    const newNotification = await Notification.create(req.body);

    res.status(200).json({
      status: 'success',
      total: newNotification.length,
      result: newNotification,
    });
  } catch (error) {
    next(error);
  }
};

const getNotificationById = async (req, res, next) => {
  try {
    const notification = await Notification.findById(req.params.id);

    if (!notification) {
      return next(new AppError('No Notification found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      result: notification,
    });
  } catch (error) {
    next(error);
  }
};

const updateNotificationById = async (req, res, next) => {
  try {
    const { id } = req.params;

    req.body.updatedAt = Date.now();
    const newNotification = await Notification.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (newNotification) {
      return next(new AppError('No Notification found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      result: newNotification,
    });
  } catch (error) {
    next(error);
  }
};
const deleteNotificationById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const notification = await Notification.findByIdAndDelete(id);

    if (!notification) {
      return next(new AppError('No Notification found with that ID', 404));
    }

    if (!notification) {
      res.status(400).json({
        status: 'fail',
        message: 'id not found',
      });
    }
    res.status(204).json({
      status: 'success',
      result: notification,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllNotifications,
  createNotification,
  getNotificationById,
  updateNotificationById,
  deleteNotificationById,
};
