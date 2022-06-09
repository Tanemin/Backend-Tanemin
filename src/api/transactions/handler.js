/* eslint-disable consistent-return */
const AppError = require('../../exceptions/app-error');
const Transaction = require('./validator');

const getAllTransactions = async (req, res, next) => {
  try {
    const transaction = await Transaction.find();

    res.status(200).json({
      status: 'success',
      total: transaction.length,
      result: transaction,
    });
  } catch (error) {
    next(error);
  }
};

const createTransaction = async (req, res, next) => {
  try {
    const newTransaction = await Transaction.create(req.body);

    res.status(200).json({
      status: 'success',
      total: newTransaction.length,
      result: newTransaction,
    });
  } catch (error) {
    next(error);
  }
};

const getTransactionById = async (req, res, next) => {
  try {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return next(new AppError('No Transaction found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      result: transaction,
    });
  } catch (error) {
    next(error);
  }
};

const updateTransactionById = async (req, res, next) => {
  try {
    const { id } = req.params;

    req.body.updatedAt = Date.now();
    const newTransaction = await Transaction.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (newTransaction) {
      return next(new AppError('No Transaction found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      result: newTransaction,
    });
  } catch (error) {
    next(error);
  }
};
const deleteTransactionById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const transaction = await Transaction.findByIdAndDelete(id);

    if (!transaction) {
      return next(new AppError('No Transaction found with that ID', 404));
    }

    if (!transaction) {
      res.status(400).json({
        status: 'fail',
        message: 'id not found',
      });
    }
    res.status(204).json({
      status: 'success',
      result: transaction,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllTransactions,
  createTransaction,
  getTransactionById,
  updateTransactionById,
  deleteTransactionById,
};
