const express = require('express');
const { protect, generateAccess } = require('../authentications/handler');
const CartRouter = require('../carts/routes');

const reviewRouter = require('../reviews/routes');
const TransactionRouter = require('../transactions/routes');
const {
  getAllPlants,
  createPlant,
  getPlantById,
  deletePlantById,
  UpdatePlantById,
  aliasTopPlant,
  aliasTopSearch,
  aliasTopView,
  uploadPlantImages,
  resizePlantImages,
  // searchPlant,
} = require('./handler');

const plantRouter = express.Router();

plantRouter.use('/:plantId/reviews/', reviewRouter);
plantRouter.use('/:plantId/transactions/', TransactionRouter);
plantRouter.use('/:plantId/carts/', CartRouter);

plantRouter.route('/topPlants').get(aliasTopPlant, getAllPlants);
plantRouter.route('/topSearchs').get(aliasTopSearch, getAllPlants);
plantRouter.route('/topViews').get(aliasTopView, getAllPlants);

plantRouter
  .route('/')
  .get(getAllPlants)
  .post(
    protect,
    generateAccess('administrator'),
    uploadPlantImages,
    resizePlantImages,
    createPlant,
  );

plantRouter
  .route('/:id')
  .get(getPlantById)
  .patch(
    protect,
    generateAccess('administrator'),
    uploadPlantImages,
    resizePlantImages,
    UpdatePlantById,
  )
  .delete(protect, generateAccess('administrator'), deletePlantById);

module.exports = plantRouter;
