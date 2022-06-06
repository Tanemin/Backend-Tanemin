const express = require('express');
const { protect, generateAccess } = require('../authentications/handler');

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

plantRouter
  .route('/')
  .get(getAllPlants)
  .post(protect, generateAccess('administrator'), createPlant);
plantRouter
  .route('/:id')
  .get(getPlantById)
  .patch(protect, generateAccess('administrator'), UpdatePlantById)
  .delete(protect, generateAccess('administrator'), deletePlantById);

module.exports = plantRouter;
