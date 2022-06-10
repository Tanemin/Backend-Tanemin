const mongoose = require('mongoose');
const Plant = require('../plants/validator');

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

transactionSchema.statics.calculateSumStocks = async function (
  plantId,
  ammount,
) {
  const stats = await this.aggregate([
    {
      $match: { plant: plantId },
    },
    {
      $group: {
        _id: '$plant',
        sumSold: { $sum: '$ammount' },
      },
    },
  ]);
  const plant = await Plant.findById(plantId).select('stock plantName');
  await Plant.findByIdAndUpdate(plantId, {
    sold: stats[0].sumSold,
    stock: plant.stock - ammount,
  });
};

transactionSchema.post('save', function () {
  this.constructor.calculateSumStocks(this.plant, this.ammount);
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
