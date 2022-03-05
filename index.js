// importing dependencies
const express = require('express');
const dotenv = require('dotenv');

// importing routers
const usersRouter = require('./routes/userRoutes');
const incomeRouter = require('./routes/incomeRoutes');
const expenseRouter = require('./routes/expenseRoutes');
const categoryRouter = require('./routes/categoryRoutes');

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
app.use('/api/users', usersRouter);
app.use('/api/incomes', incomeRouter);
app.use('/api/expenses', expenseRouter);
app.use('/api/categories', categoryRouter);

// using error handling middleware
app.use(notFoundHandler);
app.use(errorHandler);

// defining port
const port = process.env.PORT;

// if port is not defined throw an error
if (!process.env.PORT) throw new Error('PORT is not defined');

// listening to the port
app.listen(port);
