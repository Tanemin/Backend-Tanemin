const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  notificationTitle: {
    type: String,
    required: [true, 'title is required'],
  },
  notificationDescription: {
    type: String,
    required: [true, 'Description is required'],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    require: [true, 'Notification must belong to an User'],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

notificationSchema.pre(/^find/, function (next) {
  this.select('-__v');

  next();
});

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;
