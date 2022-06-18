const express = require('express');
const { protect } = require('../authentications/handler');

const TodoRouter = require('../todo/router');

const {
  getAllProductivity,
  createProductivity,
  getProductivityById,
  updateProductivityById,
  deleteProductivityById,
  setProductivityAndUserId,
} = require('./handler');

const ProductivityRouter = express.Router({ mergeParams: true });

ProductivityRouter.use('/:productiveId/todos/', TodoRouter);

ProductivityRouter.route('/')
  .get(protect, getAllProductivity)
  .post(protect, setProductivityAndUserId, createProductivity);

ProductivityRouter.route('/:id')
  .get(getProductivityById)
  .patch(updateProductivityById)
  .delete(deleteProductivityById);

module.exports = ProductivityRouter;
