const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const globalErrorHandler = require('./utils/global-error-handler');
const AppError = require('./exceptions/app-error');

const plantRouter = require('./api/plants/routes');
const reviewRouter = require('./api/reviews/routes');
const userRouter = require('./api/users/routes');
const CartRouter = require('./api/carts/routes');
const TransactionRouter = require('./api/transactions/routes');
const NotificationRouter = require('./api/notifications/routes');
const storeRouter = require('./api/store/routes');
const ProductivityRouter = require('./api/productivities/routes');
const TodoRouter = require('./api/todo/router');

const app = express();

app.use(cors());

// 1) MIDDLEWARES

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// 2) ROUTES
app.use('/api/v1/users', userRouter);
app.use('/api/v1/plants', plantRouter);
app.use('/api/v1/reviews', reviewRouter);
app.use('/api/v1/store', storeRouter);
app.use('/api/v1/carts', CartRouter);
app.use('/api/v1/transactions', TransactionRouter);
app.use('/api/v1/notifications', NotificationRouter);
app.use('/api/v1/productivities', ProductivityRouter);
app.use('/api/v1/todos', TodoRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
