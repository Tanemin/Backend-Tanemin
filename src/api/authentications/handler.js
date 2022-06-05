/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable indent */
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { promisify } = require('util');

const User = require('../users/validator');
const sendEmail = require('../../utils/email');

const createToken = (id) =>
  // eslint-disable-next-line implicit-arrow-linebreak
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

const signUp = async (req, res) => {
  try {
    req.body.password = await bcrypt.hash(req.body.password, 12);
    const newUser = await User.create(req.body);
    const token = createToken(newUser.id);

    res.status(201).json({
      status: 'success',
      token,
      data: {
        newUser,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error,
    });
  }
};

const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({
        status: 'fail',
        message: 'Please provide email and password!',
      });
    }

    const user = await User.findOne({ email });

    const comparePassword = await bcrypt.compare(password, user.password);

    if (!user || !comparePassword) {
      res.status(401).json({
        status: 'fail',
        message: 'incorrect email and password',
      });
    }

    const token = createToken(user.id);
    res.status(201).json({
      status: 'success',
      token,
      data: {
        user,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error,
    });
  }
};

const protect = async (req, res, next) => {
  try {
    let token;

    if (
      // eslint-disable-next-line operator-linebreak
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      // eslint-disable-next-line prefer-destructuring
      token = req.headers.authorization.split(' ')[1];
    }
    if (!token) {
      res.status(401).json({
        status: 'fail',
        message: 'You are not logged in! Please log in to get access.',
      });
    }

    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    const currentUser = await User.findById(decoded.id);

    if (!currentUser) {
      res.status(401).json({
        status: 'fail',
        message: 'The user belonging to this token does no longer exist.',
      });
    }
    req.user = currentUser;
    next();
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error,
    });
  }
};

// eslint-disable-next-line operator-linebreak
const generateAccess =
  (...roles) =>
  (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      res.status(403).json({
        status: 'fail',
        message: 'You do not have permission to perform this action',
      });
    }

    next();
  };

const forgotPassword = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    res.status(404).json({
      status: 'fail',
      message: 'email not found',
    });
  }

  const resetToken = crypto.randomBytes(32).toString('hex');
  // await user.save({ validateBeforeSave: false });

  const encryptedToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  const resetURL = `${req.protocol}://${req.get(
    'host',
  )}/api/v1/users/resetPassword/${encryptedToken}`;

  const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${resetURL}.\nIf you didn't forget your password, please ignore this email!`;
  await sendEmail({
    email: user.email,
    subject: 'Your password reset token (valid for 10 min)',
    message,
  });

  res.status(200).json({
    status: 'success',
    message: 'Token sent to email!',
  });
};

module.exports = {
  signUp,
  signIn,
  protect,
  generateAccess,
  forgotPassword,
};
