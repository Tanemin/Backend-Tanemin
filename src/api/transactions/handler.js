/* eslint-disable consistent-return */
const Stripe = require('stripe');

const AppError = require('../../exceptions/app-error');
const Plant = require('../plants/validator');
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
    const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

    const plant = await Plant.findById(req.body.plant);
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      success_url: `${req.protocol}://${req.get('host')}/detail/${
        req.body.plant
      }`,
      cancel_url: `${req.protocol}://${req.get('host')}/detail/${
        req.body.plant
      }`,
      customer_email: req.user.email,
      client_reference_id: req.body.plant,
      line_items: [
        {
          name: `${plant.plantName}`,
          description: plant.description,
          images: [`${plant.imageCover}`],
          amount: plant.price * 100,
          currency: 'idr',
          quantity: req.body.ammount,
        },
      ],
    });

    await Transaction.create(req.body);

    res.status(200).json({
      status: 'success',
      session,
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

const setPlantAndUserId = async (req, res, next) => {
  if (!req.body.plant) req.body.plant = req.params.plantId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

module.exports = {
  getAllTransactions,
  createTransaction,
  getTransactionById,
  updateTransactionById,
  deleteTransactionById,
  setPlantAndUserId,
};
