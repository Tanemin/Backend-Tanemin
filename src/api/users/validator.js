const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: [true, 'name required'],
  },
  email: {
    type: String,
    required: [true, 'email required'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'email invalid'],
  },
  password: {
    type: String,
    required: [true, 'passwrod required'],
    minlength: 8,
  },
  role: {
    type: String,
    enum: ['user', 'administrator'],
    default: 'user',
  },
  phoneNumber: Number,
  photo: String,
  debitCard: [String],
  address: {
    city: String,
    province: String,
    address: String,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: Date,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
