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
  water: {
    type: Number,
    default: 0,
  },
  organicFertilizer: {
    type: Number,
    default: 0,
  },
  chemicalFertilizer: {
    type: Number,
    default: 0,
  },
  cutting: {
    type: Number,
    default: 0,
  },
  nutrition: {
    type: Number,
    default: 0,
  },
  potReplacement: {
    type: Number,
    default: 0,
  },
  passedAllTodo: {
    type: Boolean,
    default: false,
  },
  status: {
    type: Boolean,
    default: false,
  },
});

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;
