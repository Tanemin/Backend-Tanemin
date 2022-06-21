const express = require('express');
const {
  getUsersView,
  getPlantsView,
  getStoresView,
  getTransactionsView,
  getAddStoreView,
  getAddPlantView,
} = require('./controller');

const ViewRouter = express.Router();

ViewRouter.get('/', getUsersView);
ViewRouter.get('/plants', getPlantsView);
ViewRouter.get('/plants/add-plant', getAddPlantView);
ViewRouter.get('/stores', getStoresView);
ViewRouter.get('/stores/add-store', getAddStoreView);
ViewRouter.get('/transactions', getTransactionsView);

module.exports = ViewRouter;
