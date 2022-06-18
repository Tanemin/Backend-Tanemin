const mongoose = require('mongoose');

const productivitySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    require: [true, 'Notification must belong to an User'],
  },
  plantGroup: {
    type: String,
    require: [true, 'plant Group must required'],
  },
  plantName: [String],
  totalPlant: {
    type: Number,
    default: 1,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: Date,
  currentMonthlyProductivity: {
    type: Number,
    default: 0,
  },
  currentWeeklyProductivity: {
    type: Number,
    default: 0,
  },
});

const Productivity = mongoose.model('Productivity', productivitySchema);

module.exports = Productivity;
