const express = require('express');

const {
  getAllTransactions,
  createTransaction,
  getTransactionById,
  updateTransactionById,
  deleteTransactionById,
} = require('./handler');

const TransactionRouter = express.Router();

TransactionRouter.route('/').get(getAllTransactions).post(createTransaction);
TransactionRouter.route('/:id')
  .get(getTransactionById)
  .patch(updateTransactionById)
  .delete(deleteTransactionById);

module.exports = TransactionRouter;
