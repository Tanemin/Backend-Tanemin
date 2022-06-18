const express = require('express');
const {
  signUp,
  signIn,
  protect,
  forgotPassword,
  generateAccess,
  resetPassword,
} = require('../authentications/handler');
const CartRouter = require('../carts/routes');
const NotificationRouter = require('../notifications/routes');
const ProductivityRouter = require('../productivities/routes');
const TransactionRouter = require('../transactions/routes');
const {
  getAllUsers,
  createUser,
  getCurrentUser,
  updateCurrentUser,
  deleteUserById,
  UpdateUserById,
  getUserById,
} = require('./handler');

const userRouter = express.Router();

userRouter.use('/profile/carts/', CartRouter);
userRouter.use('/profile/notifications/', NotificationRouter);
userRouter.use('/profile/transactions/', TransactionRouter);
userRouter.use('/profile/productivities/', ProductivityRouter);

userRouter.route('/signup').post(signUp);
userRouter.route('/signin').post(signIn);

userRouter.route('/forgotPassword').post(forgotPassword);
userRouter.route('/resetPassword/:token').post(resetPassword);

userRouter
  .route('/profile')
  .get(protect, getCurrentUser)
  .patch(protect, updateCurrentUser);

userRouter
  .route('/')
  .get(protect, generateAccess('administrator'), getAllUsers)
  .post(createUser);
userRouter
  .route('/:id')
  .get(protect, generateAccess('administrator'), getUserById)
  .patch(protect, generateAccess('administrator'), UpdateUserById)
  .delete(protect, generateAccess('administrator'), deleteUserById);

module.exports = userRouter;
