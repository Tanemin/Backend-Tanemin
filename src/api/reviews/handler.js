/* eslint-disable consistent-return */
const AppError = require('../../exceptions/app-error');
const Review = require('./validator');

const getAllReview = async (req, res, next) => {
  try {
    let filter = {};
    if (req.params.plantId) filter = { plant: req.params.plantId };
    const review = await Review.find(filter);

    res.status(200).json({
      status: 'success',
      length: review.length,
      result: review,
    });
  } catch (error) {
    next(error);
  }
};

const createReview = async (req, res, next) => {
  try {
    const review = await Review.create(req.body);

    res.status(200).json({
      status: 'success',
      result: review,
    });
  } catch (error) {
    next(error);
  }
};

const getReviewById = async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      return next(new AppError('No Review found with that id', 404));
    }
    res.status(200).json({
      status: 'success',
      result: review,
    });
  } catch (error) {
    next(error);
  }
};

const UpdateReviewById = async (req, res, next) => {
  try {
    const { id } = req.params;

    req.body.updatedAt = Date.now();
    const newReview = await Review.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!newReview) {
      return next(new AppError('No Review found with that id', 404));
    }

    res.status(200).json({
      status: 'success',
      result: newReview,
    });
  } catch (error) {
    next(error);
  }
};
const deleteReviewById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const review = await Review.findByIdAndDelete(id);

    if (!review) {
      return next(new AppError('No Review found with that id', 404));
    }
    res.status(204).json({
      status: 'success',
      result: review,
    });
  } catch (error) {
    next(error);
  }
};

const setPlantAndUserId = async (req, res, next) => {
  if (!req.body.plant) req.body.plant = req.params.plantId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

module.exports = {
  getAllReview,
  createReview,
  getReviewById,
  UpdateReviewById,
  deleteReviewById,
  setPlantAndUserId,
};
