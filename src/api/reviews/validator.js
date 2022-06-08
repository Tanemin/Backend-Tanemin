const mongoose = require('mongoose');

const Plant = require('../plants/validator');

const reviewSchema = new mongoose.Schema(
  {
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
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: 'fullname email photo',
  });
  next();
});
reviewSchema.pre(/^find/, function (next) {
  this.select('-__v');
  next();
});

reviewSchema.statics.calculateAverageRatings = async function (plantId) {
  const stats = await this.aggregate([
    {
      $match: { plant: plantId },
    },
    {
      $group: {
        _id: '$plant',
        sumRating: { $sum: 1 },
        avgRating: { $avg: '$rating' },
      },
    },
  ]);
  // console.log(stats[0].sumRating);
  if (stats.length > 0) {
    await Plant.findByIdAndUpdate(plantId, {
      ratingsQuantity: stats[0].sumRating,
      ratingsAverage: stats[0].avgRating,
    });
  } else {
    await Plant.findByIdAndUpdate(plantId, {
      ratingsQuantity: 0,
      ratingsAverage: 0,
    });
  }
};

reviewSchema.post('save', function () {
  this.constructor.calculateAverageRatings(this.plant);
});

// eslint-disable-next-line prefer-arrow-callback
reviewSchema.post(/^findOneAnd/, async function (docs) {
  await docs.constructor.calculateAverageRatings(docs.tour);
});
const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
