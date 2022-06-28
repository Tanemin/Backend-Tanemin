const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema(
  {
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
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    updatedAt: Date,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

cartSchema.pre(/^findOne/, function (next) {
  this.populate({
    path: 'user',
    select: 'fullname email',
  }).populate({
    path: 'plant',
    select:
      'plantName price image stock ratingsAverage ratingsQuantity imageCover',
  });

  next();
});
cartSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'plant',
    select:
      'plantName price image stock ratingsAverage ratingsQuantity imageCover',
  });

  next();
});
cartSchema.pre(/^find/, function (next) {
  this.select('-__v');

  next();
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
