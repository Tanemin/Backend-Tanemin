const express = require('express');
const {
  signUp,
  signIn,
  protect,
  forgotPassword,
  generateAccess,
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
