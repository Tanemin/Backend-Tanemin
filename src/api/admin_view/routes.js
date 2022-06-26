const express = require('express');
const { isLoggedIn, protect } = require('../authentications/handler');
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
  getLoginView,
} = require('./controller');
//
const ViewRouter = express.Router();

ViewRouter.get('/', getLoginView);
ViewRouter.get('/users', isLoggedIn, protect, getUsersView);
ViewRouter.get('/plants', isLoggedIn, protect, getPlantsView);
ViewRouter.get('/plants/add-plant', isLoggedIn, protect, getAddPlantView);
ViewRouter.get('/plants/update/:id', isLoggedIn, protect, getUpdatePlantView);
ViewRouter.get('/stores', isLoggedIn, protect, getStoresView);
ViewRouter.get('/stores/add-store', isLoggedIn, protect, getAddStoreView);
ViewRouter.get('/stores/update/:id', isLoggedIn, protect, updateAddStoreView);
ViewRouter.get('/stores/delete/:id', isLoggedIn, protect, deleteStoreView);
ViewRouter.get('/transactions', isLoggedIn, protect, getTransactionsView);

module.exports = ViewRouter;
