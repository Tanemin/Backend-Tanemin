const express = require('express');
// const { protect, generateAccess } = require('../authentications/handler');

// const plantRouter = require('../plants/routes');
const {
  getAllStore,
  createStore,
  getStoreById,
  updateStoreById,
  deleteStoreById,
} = require('./handler');

const storeRouter = express.Router();

storeRouter.route('/').get(getAllStore).post(createStore);
storeRouter
  .route('/:id')
  .get(getStoreById)
  .patch(updateStoreById)
  .delete(deleteStoreById);

module.exports = storeRouter;
