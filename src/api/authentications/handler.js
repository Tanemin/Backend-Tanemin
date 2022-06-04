const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { promisify } = require('util');

const User = require('../users/validator');

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

module.exports = { signUp, signIn, protect };
