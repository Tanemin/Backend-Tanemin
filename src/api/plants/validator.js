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
    ratingsAverage: {
      type: Number,
      default: 0,
      min: [0, 'Rating must be above 0'],
      max: [5, 'Rating must be below 5.0'],
      set: (val) => Math.round(val * 10) / 10,
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    stock: {
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

plantSchema.virtual('search').get(function () {
  return `${slugify(this.plantName, { lower: true })}`;
});
// plantSchema.pre(/^find/, function (next) {
//   this.search = slugify(this.name, { lower: true });
//   next();
// });

// Query Middleware
plantSchema.pre(/^find/, function (next) {
  this.select('-__v');
  next();
});

const Plant = mongoose.model('Plant', plantSchema);

module.exports = Plant;
