const express = require('express');
const { signUp, signIn, protect } = require('../authentications/handler');
const { getAllUsers, createUser, getCurrentUser } = require('./handler');

const userRouter = express.Router();

userRouter.route('/signup').post(signUp);
userRouter.route('/signin').post(signIn);
userRouter.route('/profile').get(protect, getCurrentUser);
userRouter.route('/').get(protect, getAllUsers).post(createUser);

module.exports = userRouter;
