const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  notificationTitle: {
    type: String,
    required: [true, 'title is required'],
  },
  notificationDescription: {
    type: String,
    required: [true, 'title is required'],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    require: [true, 'Review must belong to an User'],
  },
  notificationType: {
    type: String,
    enum: ['Alert', 'Transaction', 'Account'],
    default: 'Alert',
  },
});

notificationSchema.pre(/^find/, function (next) {
  this.select('-__v');

  next();
});

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;
