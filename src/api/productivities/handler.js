/* eslint-disable no-underscore-dangle */
/* eslint-disable consistent-return */
const AppError = require('../../exceptions/app-error');
const Todo = require('../todo/validator');
const Productivity = require('./validator');

const getAllProductivity = async (req, res, next) => {
  try {
    let filter = {};
    if (req.user) filter = { user: req.user.id };
    const productivity = await Productivity.find(filter);

    res.status(200).json({
      status: 'success',
      total: productivity.length,
      result: productivity,
    });
  } catch (error) {
    next(error);
  }
};

const createProductivity = async (req, res, next) => {
  try {
    const newProductivity = await Productivity.create(req.body);

    await Todo.create({ productivity: newProductivity._id });
    res.status(200).json({
      status: 'success',
      total: newProductivity.length,
      result: newProductivity,
    });
  } catch (error) {
    next(error);
  }
};

const getProductivityById = async (req, res, next) => {
  try {
    const productivity = await Productivity.findById(req.params.id).populate(
      'todo',
    );

    if (!productivity) {
      return next(new AppError('No Productivity found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      result: productivity,
    });
  } catch (error) {
    next(error);
  }
};

const updateProductivityById = async (req, res, next) => {
  try {
    const { id } = req.params;

    req.body.updatedAt = Date.now();
    const newProductivity = await Productivity.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (newProductivity) {
      return next(new AppError('No Productivity found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      result: newProductivity,
    });
  } catch (error) {
    next(error);
  }
};
const deleteProductivityById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const productivity = await Productivity.findByIdAndDelete(id);

    if (!productivity) {
      return next(new AppError('No Productivity found with that ID', 404));
    }

    if (!productivity) {
      res.status(400).json({
        status: 'fail',
        message: 'id not found',
      });
    }
    res.status(204).json({
      status: 'success',
      result: productivity,
    });
  } catch (error) {
    next(error);
  }
};

const setProductivityAndUserId = async (req, res, next) => {
  // if (!req.body.plant) req.body.plant = req.params.plantId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

module.exports = {
  getAllProductivity,
  createProductivity,
  getProductivityById,
  updateProductivityById,
  deleteProductivityById,
  setProductivityAndUserId,
};
