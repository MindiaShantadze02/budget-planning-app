// defining path for environment variables
require('dotenv').config({ path: `${__dirname}/config/.env` });

// checking if JWT SECRET is defined or not
if (!process.env.JWT_SECRET) throw new Error('JWT Secret is not defined');

// importing dependencies
const express = require('express');
const cors = require('cors');
const passport = require('passport');

// importing routers
const usersRouter = require('./routes/userRoutes');
const categoryRouter = require('./routes/categoryRoutes');
const transactionRouter = require('./routes/transactionRoutes');
const accountRouter = require('./routes/accountRoutes');
const piggybankRouter = require('./routes/piggybankRoutes');
const currencyRouter = require('./routes/currencyRoutes');

// error handling middleware
const errorHandler = require('./middleware/errorMiddleware');
const notFoundHandler = require('./middleware/notFound');
const connectDB = require('./config/connectDB');

// connecting to database
const mongoUri = `${process.env.MONGO_URI}${process.env.DB_NAME}`;
connectDB(mongoUri);

// app variable
const app = express();

// using required global middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());

// using routers
app.use('/users', usersRouter);
app.use('/categories', categoryRouter);
app.use('/transactions', transactionRouter);
app.use('/accounts', accountRouter);
app.use('/piggybanks', piggybankRouter);
app.use('/currencies', currencyRouter);

// using error handling middleware
app.use(notFoundHandler);
app.use(errorHandler);

// defining port
const port = process.env.PORT;

// if port is not defined throw an error
if (!process.env.PORT) throw new Error('PORT is not defined');

// listening to the port
app.listen(port);
