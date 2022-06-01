/* eslint-disable no-console */
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');

dotenv.config({ path: './.dev.env' });

process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPOTION: Shutting down...');
  console.log(err.name, err.message);
  // server.close(() => {
  process.exit(1);
  // });
});

const DB = process.env.DATABASE;

mongoose
  .connect(DB, {
    useNewUrlParser: true,
  })
  .then(() => console.log('DB connection successful!'));

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION: Shutting down...');
  console.log(err);
  server.close(() => {
    process.exit(1);
  });
});
