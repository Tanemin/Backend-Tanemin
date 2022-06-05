const express = require('express');
const {
  signUp,
  signIn,
  protect,
  forgotPassword,
} = require('../authentications/handler');
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

userRouter.route('/signup').post(signUp);
userRouter.route('/signin').post(signIn);

userRouter.route('/forgotPassword').post(forgotPassword);

userRouter
  .route('/profile')
  .get(protect, getCurrentUser)
  .patch(protect, updateCurrentUser);

userRouter.route('/').get(protect, getAllUsers).post(createUser);
userRouter
  .route('/:id')
  .get(getUserById)
  .patch(UpdateUserById)
  .delete(deleteUserById);

module.exports = userRouter;
