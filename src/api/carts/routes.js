const express = require('express');
const { protect, generateAccess } = require('../authentications/handler');

const {
  getAllCarts,
  createCart,
  getCartById,
  UpdateCartById,
  deleteCartById,
  setPlantAndUserId,
} = require('./handler');

const CartRouter = express.Router({ mergeParams: true });

CartRouter.route('/')
  .get(protect, getAllCarts)
  .post(protect, generateAccess('user'), setPlantAndUserId, createCart);

CartRouter.route('/:id')
  .get(protect, getCartById)
  .patch(protect, generateAccess('user'), UpdateCartById)
  .delete(protect, generateAccess('user'), deleteCartById);

module.exports = CartRouter;
