const mongoose = require('mongoose');
const slugify = require('slugify');

const storeSchema = new mongoose.Schema(
  {
    storeName: {
      type: String,
      required: [true, 'name is required'],
    },
    description: {
      type: String,
      required: [true, 'description is required'],
    },
    owner: {
      type: String,
      required: [true, 'owner is required'],
    },
    ratingStore: {
      type: Number,
      default: 0,
      min: [0, 'Rating must be above 0'],
      max: [5, 'Rating must be below 5.0'],
      set: (val) => Math.round(val * 10) / 10,
    },
    imageCover: {
      type: String,
      required: [true, 'image cover is required'],
    },
    imageGalery: [String],
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

// Virtual populate
storeSchema.virtual('plants', {
  ref: 'Review',
  foreignField: 'plant',
  localField: '_id',
});

storeSchema.virtual('search').get(function () {
  return `${slugify(this.storeName, { lower: true })}`;
});

// Query Middleware
storeSchema.pre(/^find/, function (next) {
  this.select('-__v');
  next();
});

const Store = mongoose.model('Store', storeSchema);

module.exports = Store;
