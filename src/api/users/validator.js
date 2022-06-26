const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema(
  {
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
    photo: {
      type: String,
      default: 'default.jpg',
    },
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
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    updatedAt: Date,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);
userSchema.pre(/^find/, function (next) {
  this.select('-__v');

  next();
});

userSchema.virtual('carts', {
  ref: 'Cart',
  foreignField: 'user',
  localField: '_id',
});
userSchema.virtual('transactions', {
  ref: 'Transaction',
  foreignField: 'user',
  localField: '_id',
});
userSchema.virtual('notifications', {
  ref: 'Notification',
  foreignField: 'user',
  localField: '_id',
});

const User = mongoose.model('User', userSchema);

module.exports = User;
