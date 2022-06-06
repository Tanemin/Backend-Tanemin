const Plant = require('./validator');

const getAllPlants = async (req, res) => {
  try {
    const plants = await Plant.find().select(
      'plantName price imageCover stock diameter height',
    );

    res.status(200).json({
      status: 'success',
      total: plants.length,
      result: plants,
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error,
    });
  }
};

const createPlant = async (req, res) => {
  try {
    const newPlant = await Plant.create(req.body);

    res.status(200).json({
      status: 'success',
      data: {
        newPlant,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error,
    });
  }
};

const getPlantById = async (req, res) => {
  try {
    const plant = await Plant.findById(req.params.id).populate('reviews');

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

const UpdatePlantById = async (req, res) => {
  try {
    const { id } = req.params;

    req.body.updatedAt = Date.now();
    const newPlant = await Plant.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: 'success',
      data: {
        newPlant,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error,
    });
  }
};
const deletePlantById = async (req, res) => {
  try {
    const { id } = req.params;

    const plant = await Plant.findByIdAndDelete(id);
    if (!plant) {
      res.status(400).json({
        status: 'fail',
        message: 'id not found',
      });
    }
    res.status(204).json({
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

module.exports = {
  getAllPlants,
  createPlant,
  getPlantById,
  UpdatePlantById,
  deletePlantById,
};
