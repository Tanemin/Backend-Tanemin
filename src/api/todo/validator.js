const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  productivity: {
    type: mongoose.Schema.ObjectId,
    ref: 'Productivity',
    require: [true, 'Review must belong to a Productivity'],
  },
  day: {
    type: Number,
    default: 1,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: Date,
  dailyCheck: {
    type: Boolean,
    default: false,
  }, // daily
  water: Boolean, // every 2 dayss
  organicFertilizer: Boolean, // every 14 days
  chemicalFertilizer: Boolean, // every 20 days
  cutting: Boolean, // every 14 days
  nutrition: Boolean, // every 7 days
  potReplacement: Boolean, // every 30 day
  status: {
    type: Boolean,
    default: false,
  },
});

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;
