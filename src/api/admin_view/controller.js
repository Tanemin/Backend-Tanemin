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
    res.status(200).render('addStore', {
      title: 'Add Store',
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

    res.status(200).render('addPlant', {
      title: 'Add Plant',
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
  getTransactionsView,
  getAddStoreView,
  getAddPlantView,
};
