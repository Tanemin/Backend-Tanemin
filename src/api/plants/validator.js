/* eslint-disable prefer-arrow-callback */
/* eslint-disable no-undef */
const mongoose = require('mongoose');
const slugify = require('slugify');

const plantSchema = new mongoose.Schema(
  {
    plantName: {
      type: String,
      required: [true, 'name is required'],
    },
    description: {
      type: String,
    },
    duration: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
    },
    ratingsAverage: {
      type: Number,
      default: 0,
      min: [0, 'Rating must be above 0'],
      max: [5, 'Rating must be below 5.0'],
      set: (val) => Math.round(val * 10) / 10,
    },
    store: {
      type: mongoose.Schema.ObjectId,
      ref: 'Store',
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    stock: {
      type: Number,
      default: 0,
    },
    sold: {
      type: Number,
      default: 0,
    },
    imageCover: {
      type: String,
    },
    imageGalery: [String],
    difficulty: String,
    height: Number,
    diameter: Number,
    type: [String],
    tags: [String],
    season: [String],
    habitat: [String],
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    updatedAt: Date,
    searchCount: {
      type: Number,
      default: 0,
    },
    viewCount: {
      type: Number,
      default: 0,
    },
    searchQuery: String,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

plantSchema.virtual('reviews', {
  ref: 'Review',
  foreignField: 'plant',
  localField: '_id',
});

plantSchema.pre('save', function (next) {
  this.searchQuery = slugify(this.plantName, { lower: true });
  next();
});

plantSchema.pre(/^find/, function (next) {
  this.select('-__v');
  next();
});

const Plant = mongoose.model('Plant', plantSchema);

module.exports = Plant;
