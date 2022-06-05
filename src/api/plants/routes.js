const express = require('express');

const reviewRouter = require('../reviews/routes');
const {
  getAllPlants,
  createPlant,
  getPlantById,
  deletePlantById,
  UpdatePlantById,
} = require('./handler');

const plantRouter = express.Router();

plantRouter.use('/:plantId/reviews/', reviewRouter);

plantRouter.route('/').get(getAllPlants).post(createPlant);
plantRouter
  .route('/:id')
  .get(getPlantById)
  .patch(UpdatePlantById)
  .delete(deletePlantById);

module.exports = plantRouter;
