const mongoose = require('mongoose');

const plantSchema = new mongoose.Schema({
  plantName: {
    type: String,
    required: [true, 'name is required'],
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
  type: [String],
  tags: [String],
  season: [String],
  habitat: [String],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: Date,
});

const Plant = mongoose.model('Plant', plantSchema);

module.exports = Plant;
