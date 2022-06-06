const filterObject = require('../../utils/utils');
const User = require('./validator');

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('fullname email role');

    res.status(200).json({
      status: 'success',
      results: users.length,
      data: {
        users,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error,
    });
  }
};

const createUser = async (req, res) => {
  try {
    const newUser = await User.create(req.body);

    res.status(200).json({
      status: 'success',
      data: {
        newUser,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error,
    });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    res.status(200).json({
      status: 'success',
      data: {
        user,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error,
    });
  }
};

const UpdateUserById = async (req, res) => {
  try {
    const { id } = req.params;

    req.body.updatedAt = Date.now();
    const newUser = await User.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: 'success',
      data: {
        newUser,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error,
    });
  }
};
const deleteUserById = async (req, res) => {
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
      data: {
        user,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error,
    });
  }
};

const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      res.status(400).json({
        status: 'fail',
        message: 'User not found',
      });
    }
    res.status(200).json({
      status: 'success',
      data: {
        data: user,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error,
    });
  }
};

const updateCurrentUser = async (req, res) => {
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
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error,
    });
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
