/* eslint-disable no-restricted-globals */
const fs = require('fs');
const Plant = require('../plants/validator');
const Store = require('../store/validator');
const Transaction = require('../transactions/validator');
const User = require('../users/validator');

const getUsersView = async (req, res, next) => {
  try {
    const users = await User.find();

    console.log(res.user);
    res.status(200).render('userTable', {
      title: 'User',
      users,
    });
  } catch (err) {
    next(err);
  }
};
const getStoresView = async (req, res, next) => {
  try {
    const stores = await Store.find();
    res.status(200).render('storeTable', {
      title: 'Store',
      stores,
    });
  } catch (err) {
    next(err);
  }
};
const getAddStoreView = async (req, res, next) => {
  try {
    res.status(200).render('store-add', {
      title: 'Add Store',
    });
  } catch (err) {
    next(err);
  }
};
const updateAddStoreView = async (req, res, next) => {
  try {
    const store = await Store.findById(req.params.id);

    res.status(200).render('store-update', {
      title: 'Update Store',
      store,
    });
  } catch (err) {
    next(err);
  }
};
const deleteStoreView = async (req, res, next) => {
  try {
    const { id } = req.params;
    const oldStore = await Store.findById(id);
    if (oldStore.imageCover !== 'default.jpg') {
      fs.unlinkSync(`public/img/stores/${oldStore.imageCover}`);
    }
    await Store.findByIdAndDelete(req.params.id);
    const stores = await Store.find();
    res.status(200).render('storeTable', {
      title: 'Store',
      stores,
    });
  } catch (err) {
    next(err);
  }
};
const getPlantsView = async (req, res, next) => {
  try {
    const plants = await Plant.find();

    res.status(200).render('plantTable', {
      title: 'Plant',
      plants,
    });
  } catch (err) {
    next(err);
  }
};
const getAddPlantView = async (req, res, next) => {
  try {
    const stores = await Store.find();

    res.status(200).render('plant-add', {
      title: 'Add Plant',
      stores,
    });
  } catch (err) {
    next(err);
  }
};
const getUpdatePlantView = async (req, res, next) => {
  try {
    const plant = await Plant.findById(req.params.id);

    const stores = await Store.find();

    res.status(200).render('plant-update', {
      title: 'Update Plant',
      plant,
      stores,
    });
  } catch (err) {
    next(err);
  }
};
const getTransactionsView = async (req, res, next) => {
  try {
    const transactions = await Transaction.find();
    res.status(200).render('transactionTable', {
      title: 'Transaction',
      transactions,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getUsersView,
  getStoresView,
  getPlantsView,
  getAddPlantView,
  getUpdatePlantView,
  getTransactionsView,
  getAddStoreView,
  updateAddStoreView,
  deleteStoreView,
};
