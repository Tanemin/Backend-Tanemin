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
      required: [true, 'description is required'],
    },
    price: {
      type: Number,
      required: [true, 'price is required'],
    },
    author: {
      type: String,
      required: [true, 'author is required'],
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
      require: [true, 'Plant must belong to an Store'],
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
      required: [true, 'image cover is required'],
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
    searchQuery: String,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

// Virtual populate
plantSchema.virtual('reviews', {
  ref: 'Review',
  foreignField: 'plant',
  localField: '_id',
});

// plantSchema.virtual('searchQuery').get(function () {
//   return `${slugify(this.plantName, { lower: true })}`;
// });

plantSchema.pre('save', function (next) {
  this.searchQuery = slugify(this.plantName, { lower: true });
  next();
});
// Query Middleware
plantSchema.pre(/^find/, function (next) {
  this.select('-__v');
  next();
});

const Plant = mongoose.model('Plant', plantSchema);

module.exports = Plant;
