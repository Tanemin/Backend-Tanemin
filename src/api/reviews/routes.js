const express = require('express');
const { protect } = require('../authentications/handler');
const {
  getAllReview,
  createReview,
  getReviewById,
  UpdateReviewById,
  deleteReviewById,
  setPlantAndUserId,
} = require('./handler');

const reviewRouter = express.Router({ mergeParams: true });

reviewRouter
  .route('/')
  .get(getAllReview)
  .post(protect, setPlantAndUserId, createReview);

reviewRouter
  .route('/:id')
  .get(getReviewById)
  .patch(UpdateReviewById)
  .delete(deleteReviewById);

module.exports = reviewRouter;
