/* eslint-disable consistent-return */
const AppError = require('../../exceptions/app-error');
const Cart = require('./validator');

const getAllCarts = async (req, res, next) => {
  try {
    let filter = {};
    if (req.user) filter = { user: req.user.id };
    const carts = await Cart.find(filter);

    res.status(200).json({
      status: 'success',
      total: carts.length,
      result: carts,
    });
  } catch (error) {
    next(error);
  }
};

const createCart = async (req, res, next) => {
  try {
    const newCart = await Cart.create(req.body);

    res.status(200).json({
      status: 'success',
      total: newCart.length,
      result: newCart,
    });
  } catch (error) {
    next(error);
  }
};

const getCartById = async (req, res, next) => {
  try {
    const cart = await Cart.findById(req.params.id);

    if (!cart) {
      return next(new AppError('No Cart found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      result: cart,
    });
  } catch (error) {
    next(error);
  }
};

const UpdateCartById = async (req, res, next) => {
  try {
    const { id } = req.params;

    req.body.updatedAt = Date.now();
    const newCart = await Cart.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!newCart) {
      return next(new AppError('No Plant found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      result: newCart,
    });
  } catch (error) {
    next(error);
  }
};
const deleteCartById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const cart = await Cart.findByIdAndDelete(id);

    if (!cart) {
      return next(new AppError('No Cart found with that ID', 404));
    }

    if (!cart) {
      res.status(400).json({
        status: 'fail',
        message: 'id not found',
      });
    }
    res.status(204).json({
      status: 'success',
      result: cart,
    });
  } catch (error) {
    next(error);
  }
};

const setCartAndUserId = async (req, res, next) => {
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

const setPlantAndUserId = async (req, res, next) => {
  if (!req.body.plant) req.body.plant = req.params.plantId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

module.exports = {
  getAllCarts,
  createCart,
  getCartById,
  UpdateCartById,
  deleteCartById,
  setCartAndUserId,
  setPlantAndUserId,
};
