const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  review: {
    type: String,
    trim: true,
    require: [true, 'Review can not be empty'],
  },
  rating: {
    type: Number,
    min: [1, 'Rating must be above 1.0'],
    max: [5, 'Rating must be below 5.0'],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: Date,
  plant: {
    type: mongoose.Schema.ObjectId,
    ref: 'Plant',
    require: [true, 'Review must belong to a Plant'],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    require: [true, 'Review must belong to an User'],
  },
});

reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: 'fullname email photo',
  });
  next();
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
