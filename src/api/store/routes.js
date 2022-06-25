const express = require('express');
// const { protect, generateAccess } = require('../authentications/handler');

// const plantRouter = require('../plants/routes');
const {
  getAllStore,
  createStore,
  getStoreById,
  updateStoreById,
  deleteStoreById,
  uploadStorePhoto,
} = require('./handler');

const storeRouter = express.Router();

storeRouter.route('/').get(getAllStore).post(uploadStorePhoto, createStore);
storeRouter
  .route('/:id')
  .get(getStoreById)
  .patch(uploadStorePhoto, updateStoreById)
  .delete(deleteStoreById);

module.exports = storeRouter;
