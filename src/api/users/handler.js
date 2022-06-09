const filterObject = require('../../utils/utils');
const User = require('./validator');

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
    const user = await User.findById(req.user.id).populate('carts');
    if (!user) {
      next('User not found', 400);
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
};
