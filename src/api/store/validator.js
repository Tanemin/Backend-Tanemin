const mongoose = require('mongoose');

const storeSchema = new mongoose.Schema(
  {
    storeName: {
      type: String,
      required: [true, 'name is required'],
    },
    description: {
      type: String,
    },
    owner: {
      type: String,
    },
    contact: String,
    ratingStore: {
      type: Number,
      default: 0,
      min: [0, 'Rating must be above 0'],
      max: [5, 'Rating must be below 5.0'],
    },
    imageCover: {
      type: String,
      required: [true, 'image cover is required'],
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

storeSchema.virtual('plants', {
  ref: 'Plant',
  foreignField: 'store',
  localField: '_id',
});

storeSchema.pre(/^find/, function (next) {
  this.select('-__v');
  next();
});

const Store = mongoose.model('Store', storeSchema);

module.exports = Store;
