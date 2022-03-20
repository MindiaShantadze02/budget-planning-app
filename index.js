// importing app
const app = require('./app');

// checking if JWT SECRET is defined or not
if (!process.env.JWT_SECRET) throw new Error('JWT Secret is not defined');

// connecting to database function
const connectDB = require('./connectDB');

// connecting to database
const mongoUri = `${process.env.MONGO_URI}${process.env.DB_NAME}`;
connectDB(mongoUri);

// defining port
const port = process.env.PORT;

// if port is not defined throw an error
if (!process.env.PORT) throw new Error('PORT is not defined');

// listening to the port
app.listen(port);
