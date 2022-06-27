/* eslint-disable consistent-return */
const multer = require('multer');
const fs = require('fs');

const AppError = require('../../exceptions/app-error');
const filterObject = require('../../utils/utils');
const User = require('./validator');

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/img/users');
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split('/')[1];
    // if (req.params.id) {
    cb(null, `user-${Date.now()}-photo.${ext}`);
    // }
  },
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('No Images', 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

const uploadUserPhoto = upload.single('photo');

const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().select('fullname email role');

    res.status(200).json({
      status: 'success',
      length: users.length,
      result: users,
    });
  } catch (error) {
    next(error);
  }
};

const createUser = async (req, res, next) => {
  try {
    const newUser = await User.create(req.body);

    res.status(200).json({
      status: 'success',
      result: newUser,
    });
  } catch (error) {
    next(error);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    res.status(200).json({
      status: 'success',
      result: user,
    });
  } catch (error) {
    next(error);
  }
};

const UpdateUserById = async (req, res, next) => {
  try {
    const { id } = req.params;

    req.body.updatedAt = Date.now();
    const newUser = await User.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: 'success',
      result: newUser,
    });
  } catch (error) {
    next(error);
  }
};
const deleteUserById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await User.findByIdAndDelete(id);
    if (!user) {
      res.status(400).json({
        status: 'fail',
        message: 'id not found',
      });
    }
    res.status(204).json({
      status: 'success',
      result: user,
    });
  } catch (error) {
    next(error);
  }
};

const getCurrentUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id)
      .populate('carts')
      .populate('transactions')
      .populate('notifications');
    if (!user) {
      next(new AppError('User not found', 400));
    }
    res.status(200).json({
      status: 'success',
      result: user,
    });
  } catch (error) {
    next(error);
  }
};

const updateCurrentUser = async (req, res, next) => {
  try {
    req.body.updatedAt = Date.now();

    const oldCurrentUser = await User.findById(req.user.id);
    if (req.file) {
      if (oldCurrentUser.photo !== 'default.jpg') {
        fs.unlinkSync(`public/img/stores/${oldCurrentUser.photo}`);
      }
      req.body.photo = req.file.filename;
    } else {
      req.body.photo = oldCurrentUser.photo;
    }

    const filteredBody = filterObject(
      req.body,
      'fullname',
      'phoneNumber',
      'photo',
      'debitCard',
      'address',
      'updatedAt',
    );

    const user = await User.findByIdAndUpdate(req.user.id, filteredBody, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: 'success',
      message: 'data has been updated',
      result: user,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllUsers,
  createUser,
  getUserById,
  UpdateUserById,
  deleteUserById,
  getCurrentUser,
  updateCurrentUser,
  uploadUserPhoto,
};
