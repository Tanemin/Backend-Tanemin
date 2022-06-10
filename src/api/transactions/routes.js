const express = require('express');
const { protect } = require('../authentications/handler');

const {
  getAllTransactions,
  createTransaction,
  getTransactionById,
  updateTransactionById,
  deleteTransactionById,
} = require('./handler');

const TransactionRouter = express.Router({ mergeParams: true });

TransactionRouter.route('/')
  .get(protect, getAllTransactions)
  .post(protect, createTransaction);
TransactionRouter.route('/:id')
  .get(protect, getTransactionById)
  .patch(protect, updateTransactionById)
  .delete(protect, deleteTransactionById);

module.exports = TransactionRouter;
