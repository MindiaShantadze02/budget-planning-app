// importing dependencies
const express = require('express');
const dotenv = require('dotenv');

// importing routers
const usersRouter = require('./routes/userRoutes');
const incomeRouter = require('./routes/categoryRoutes');
const transactionRouter = require('./routes/transactionRoutes');

// defining path for environment variables
dotenv.config({ path: `${__dirname}/config/.env` });

// error handling middleware
const errorHandler = require('./middleware/errorMiddleware');
const notFoundHandler = require('./middleware/notFound');

// app variable
const app = express();

// using body parser
app.use(express.json());

// using routers
app.use('/users', usersRouter);
app.use('/incomes', incomeRouter);
app.use('/transactions', transactionRouter);

// using error handling middleware
app.use(notFoundHandler);
app.use(errorHandler);

// defining port
const port = process.env.PORT;

// if port is not defined throw an error
if (!process.env.PORT) throw new Error('PORT is not defined');

// listening to the port
app.listen(port);
