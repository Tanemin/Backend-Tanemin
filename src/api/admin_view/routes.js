const express = require('express');
const { isLoggedIn } = require('../authentications/handler');
const {
  getUsersView,
  getPlantsView,
  getStoresView,
  getTransactionsView,
  getAddStoreView,
  getAddPlantView,
  updateAddStoreView,
  deleteStoreView,
  getUpdatePlantView,
} = require('./controller');

const ViewRouter = express.Router();

ViewRouter.get('/', isLoggedIn, getUsersView);
ViewRouter.get('/plants', getPlantsView);
ViewRouter.get('/plants/add-plant', getAddPlantView);
ViewRouter.get('/plants/update/:id', getUpdatePlantView);
ViewRouter.get('/stores', getStoresView);
ViewRouter.get('/stores/add-store', getAddStoreView);
ViewRouter.get('/stores/update/:id', updateAddStoreView);
ViewRouter.get('/stores/delete/:id', deleteStoreView);
ViewRouter.get('/transactions', getTransactionsView);

module.exports = ViewRouter;
