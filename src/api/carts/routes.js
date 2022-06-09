const express = require('express');
// const { protect, generateAccess } = require('../authentications/handler');
const {
  getAllCarts,
  createCart,
  getCartById,
  UpdateCartById,
  deleteCartById,
} = require('./handler');

const CartRouter = express.Router();

CartRouter.route('/').get(getAllCarts).post(createCart);

CartRouter.route('/:id')
  .get(getCartById)
  .patch(UpdateCartById)
  .delete(deleteCartById);

module.exports = CartRouter;
