// importing dependencies
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

// importing routers
const usersRouter = require('./routes/userRoutes');
const categoryRouter = require('./routes/categoryRoutes');
const transactionRouter = require('./routes/transactionRoutes');
const accountRouter = require('./routes/accountRoutes');

// defining path for environment variables
dotenv.config({ path: `${__dirname}/config/.env` });

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

// using error handling middleware
app.use(notFoundHandler);
app.use(errorHandler);

// defining port
const port = process.env.PORT;

// if port is not defined throw an error
if (!process.env.PORT) throw new Error('PORT is not defined');

// listening to the port
app.listen(port);
