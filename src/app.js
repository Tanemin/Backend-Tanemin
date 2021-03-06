const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');

const globalErrorHandler = require('./utils/global-error-handler');
const AppError = require('./exceptions/app-error');

const plantRouter = require('./api/plants/routes');
const reviewRouter = require('./api/reviews/routes');
const userRouter = require('./api/users/routes');
const CartRouter = require('./api/carts/routes');
const TransactionRouter = require('./api/transactions/routes');
const NotificationRouter = require('./api/notifications/routes');
const storeRouter = require('./api/store/routes');
const ViewRouter = require('./api/admin_view/routes');

const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(cors());

app.use(express.static(path.join(__dirname, '../public')));
app.use('/bs', express.static(`${__dirname}/../node_modules/bootstrap/dist`));
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(cookieParser());

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use('/', ViewRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/plants', plantRouter);
app.use('/api/v1/reviews', reviewRouter);
app.use('/api/v1/store', storeRouter);
app.use('/api/v1/carts', CartRouter);
app.use('/api/v1/transactions', TransactionRouter);
app.use('/api/v1/notifications', NotificationRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
