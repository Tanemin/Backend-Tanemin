const Review = require('./validator');

const getAllReview = async (req, res) => {
  try {
    const review = await Review.find();

    // console.log(req.user.id + 'hha');

    res.status(200).json({
      status: 'success',
      results: review.length,
      data: {
        review,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error,
    });
  }
};

const createReview = async (req, res) => {
  try {
    const review = await Review.create(req.body);
    // console.log(req.user.id);

    res.status(200).json({
      status: 'success',
      data: {
        review,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error,
    });
  }
};

const getReviewById = async (req, res) => {
  try {
    const plant = await Review.findById(req.params.id);

    res.status(200).json({
      status: 'success',
      data: {
        plant,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error,
    });
  }
};

const UpdateReviewById = async (req, res) => {
  try {
    const { id } = req.params;

    req.body.updatedAt = Date.now();
    const newReview = await Review.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: 'success',
      data: {
        newReview,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error,
    });
  }
};
const deleteReviewById = async (req, res) => {
  try {
    const { id } = req.params;

    const review = await Review.findByIdAndDelete(id);
    if (!review) {
      res.status(400).json({
        status: 'fail',
        message: 'id not found',
      });
    }
    res.status(204).json({
      status: 'success',
      data: {
        review,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error,
    });
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
