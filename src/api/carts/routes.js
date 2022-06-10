const express = require('express');
const { protect } = require('../authentications/handler');

const {
  getAllCarts,
  createCart,
  getCartById,
  UpdateCartById,
  deleteCartById,
} = require('./handler');

const CartRouter = express.Router({ mergeParams: true });

CartRouter.route('/').get(protect, getAllCarts).post(protect, createCart);

CartRouter.route('/:id')
  .get(protect, getCartById)
  .patch(protect, UpdateCartById)
  .delete(protect, deleteCartById);

module.exports = CartRouter;
