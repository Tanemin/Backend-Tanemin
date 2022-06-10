/* eslint-disable consistent-return */
/* eslint-disable no-new */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable indent */
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { promisify } = require('util');

const User = require('../users/validator');
const sendEmail = require('../../utils/email');
const AppError = require('../../exceptions/app-error');

const createToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

const signUp = async (req, res, next) => {
  try {
    req.body.password = await bcrypt.hash(req.body.password, 12);
    const newUser = await User.create(req.body);
    const token = createToken(newUser.id);

    res.status(201).json({
      status: 'success',
      token,
      result: newUser,
    });
  } catch (error) {
    next(error);
  }
};

const signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new AppError('Please provide email and password!', 400));
    }

    const user = await User.findOne({ email });

    const comparePassword = await bcrypt.compare(password, user.password);

    if (!user || !comparePassword) {
      return next(new AppError('Incorrect email or password', 401));
    }

    const token = createToken(user.id);
    res.status(201).json({
      status: 'success',
      token,
      result: user,
    });
  } catch (error) {
    next(error);
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
      return next(
        new AppError(
          'You are not logged in! Please log in to get access.',
          401,
        ),
      );
    }

    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    const currentUser = await User.findById(decoded.id);

    if (!currentUser) {
      new AppError(
        'The user belonging to this token does no longer exist.',
        401,
      );
    }
    req.user = currentUser;
    next();
  } catch (error) {
    next(error);
  }
};

// eslint-disable-next-line operator-linebreak
const generateAccess =
  (...roles) =>
  (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError('You do not have permission to perform this action', 403),
      );
    }

    next();
  };

const forgotPassword = async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new AppError('There is no user with email address.', 404));
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
  try {
    await sendEmail({
      email: user.email,
      subject: 'Your password reset token (valid for 10 min)',
      message,
    });

    res.status(200).json({
      status: 'success',
      message: 'Token sent to email!',
    });
  } catch (error) {
    return next(
      new AppError('There was an error sending the email. Try again later!'),
      500,
    );
  }
};

module.exports = {
  signUp,
  signIn,
  protect,
  generateAccess,
  forgotPassword,
};
