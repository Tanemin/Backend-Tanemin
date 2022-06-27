/* eslint-disable no-restricted-globals */
const fs = require('fs');
const Plant = require('../plants/validator');
const Store = require('../store/validator');
const Transaction = require('../transactions/validator');
const User = require('../users/validator');

const getUsersView = async (req, res, next) => {
  try {
    const users = await User.find();

    res.status(200).render('userTable', {
      title: 'User',
      users,
    });
  } catch (err) {
    next(err);
  }
};
const getLoginView = async (req, res, next) => {
  try {
    if (req.cookies.jwt) {
      res.redirect('https://tanemin.herokuapp.com//users');
    } else {
      res.status(200).render('login', {
        title: 'Login',
      });
    }
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
    res.redirect('/stores');
  } catch (err) {
    next(err);
  }
};
const deletePlantView = async (req, res, next) => {
  try {
    await Plant.findByIdAndDelete(req.params.id);
    res.redirect('/plants');
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
    const plant = await Plant.findById(req.params.id).populate({
      path: 'store',
      select: 'storeName',
    });

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
    console.log(transactions);
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
  getLoginView,
  getStoresView,
  getPlantsView,
  getAddPlantView,
  getUpdatePlantView,
  getTransactionsView,
  getAddStoreView,
  updateAddStoreView,
  deletePlantView,
  deleteStoreView,
};
