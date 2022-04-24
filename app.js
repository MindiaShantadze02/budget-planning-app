// defining path for environment variables
require('dotenv').config();

// importing dependencies
const express = require('express');
const cors = require('cors');

// importing routers
const usersRouter = require('./routes/userRoutes');
const categoryRouter = require('./routes/categoryRoutes');
const transactionRouter = require('./routes/transactionRoutes');
const accountRouter = require('./routes/accountRoutes');
const piggybankRouter = require('./routes/piggyBankRoutes');
const statisticsRouter = require('./routes/statisticsRoutes');

// error handling middleware
const errorHandler = require('./middleware/errorMiddleware');
const notFoundHandler = require('./middleware/notFound');

// app variable
const app = express();

// using required global middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// using routers
app.use('/users', usersRouter);
app.use('/categories', categoryRouter);
app.use('/transactions', transactionRouter);
app.use('/accounts', accountRouter);
app.use('/piggybanks', piggybankRouter);
app.use('/statistics', statisticsRouter);

// using error handling middleware
app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
