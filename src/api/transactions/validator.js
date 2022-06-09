const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  ammount: {
    type: Number,
    required: [true, 'ammount is required'],
    default: 1,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    require: [true, 'Review must belong to an User'],
  },
  plant: {
    type: mongoose.Schema.ObjectId,
    ref: 'Plant',
    require: [true, 'Review must belong to a Plant'],
  },
  status: {
    type: Boolean,
    default: false,
  },
  detailStatus: {
    type: String,
    enum: [
      'Waiting Payment',
      'Packaging',
      'Delivery Progress',
      'Transaction Success',
    ],
    default: 'Waiting Payment',
  },
  CreatedAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: Date,
});

transactionSchema.pre(/^find/, function (next) {
  this.select('-__v');

  next();
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
