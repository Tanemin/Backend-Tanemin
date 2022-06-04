const User = require('./validator');

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();

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

module.exports = { getAllUsers, createUser, getCurrentUser };
