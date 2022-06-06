const mongoose = require('mongoose');

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

// Query Middleware
plantSchema.pre(/^find/, function (next) {
  this.select('-__v');
  next();
});

const Plant = mongoose.model('Plant', plantSchema);

module.exports = Plant;
