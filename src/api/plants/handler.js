/* eslint-disable consistent-return */
const AppError = require('../../exceptions/app-error');
const APIFeatures = require('../../utils/api-features');
const Plant = require('./validator');

const getAllPlants = async (req, res, next) => {
  try {
    const plant = Plant.find();
    if (!req.query.fields) {
      plant.select(
        'plantName price imageCover stock ratingsAverage ratingsQuantity',
      );
    }
    const features = new APIFeatures(plant, req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    // .search();

    const plants = await features.query;

    // const query = '';
    // const plants = await Plant.find().select('plantName');

    res.status(200).json({
      status: 'success',
      total: plants.length,
      result: plants,
    });
  } catch (error) {
    next(error);
  }
};

const createPlant = async (req, res, next) => {
  try {
    const newPlant = await Plant.create(req.body);

    res.status(200).json({
      status: 'success',
      result: newPlant,
    });
  } catch (error) {
    next(error);
  }
};

const getPlantById = async (req, res, next) => {
  try {
    const plant = await Plant.findById(req.params.id).populate('reviews');

    if (!plant) {
      return next(new AppError('No Plant found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      result: plant,
    });
  } catch (error) {
    next(error);
  }
};

const UpdatePlantById = async (req, res, next) => {
  try {
    const { id } = req.params;

    req.body.updatedAt = Date.now();
    const newPlant = await Plant.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!newPlant) {
      return next(new AppError('No Plant found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      result: newPlant,
    });
  } catch (error) {
    next(error);
  }
};
const deletePlantById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const plant = await Plant.findByIdAndDelete(id);

    if (!plant) {
      return next(new AppError('No Plant found with that ID', 404));
    }

    if (!plant) {
      res.status(400).json({
        status: 'fail',
        message: 'id not found',
      });
    }
    res.status(204).json({
      status: 'success',
      result: plant,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllPlants,
  createPlant,
  getPlantById,
  UpdatePlantById,
  deletePlantById,
};
