const express = require('express');
const {
  isLoggedIn,
  protect,
  generateAccess,
} = require('../authentications/handler');
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
  deletePlantView,
  deleteUserView,
} = require('./controller');
//
const ViewRouter = express.Router();

ViewRouter.get('/', getLoginView);
ViewRouter.get(
  '/users',
  isLoggedIn,
  protect,
  generateAccess('administrator'),
  getUsersView,
);
ViewRouter.get(
  '/users/delete/:id',
  isLoggedIn,
  protect,
  generateAccess('administrator'),
  deleteUserView,
);
ViewRouter.get(
  '/plants',
  isLoggedIn,
  protect,
  generateAccess('administrator'),
  getPlantsView,
);
ViewRouter.get(
  '/plants/add-plant',
  isLoggedIn,
  protect,
  generateAccess('administrator'),
  getAddPlantView,
);
ViewRouter.get(
  '/plants/update/:id',
  isLoggedIn,
  protect,
  generateAccess('administrator'),
  getUpdatePlantView,
);
ViewRouter.get(
  '/plants/delete/:id',
  isLoggedIn,
  protect,
  generateAccess('administrator'),
  deletePlantView,
);
ViewRouter.get(
  '/stores',
  isLoggedIn,
  protect,
  generateAccess('administrator'),
  getStoresView,
);
ViewRouter.get(
  '/stores/add-store',
  isLoggedIn,
  protect,
  generateAccess('administrator'),
  getAddStoreView,
);
ViewRouter.get(
  '/stores/update/:id',
  isLoggedIn,
  protect,
  generateAccess('administrator'),
  updateAddStoreView,
);
ViewRouter.get(
  '/stores/delete/:id',
  isLoggedIn,
  protect,
  generateAccess('administrator'),
  deleteStoreView,
);
ViewRouter.get(
  '/transactions',
  isLoggedIn,
  protect,
  generateAccess('administrator'),
  getTransactionsView,
);

module.exports = ViewRouter;
