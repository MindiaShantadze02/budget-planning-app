// middleware for handling 404 errors
const notFoundHandler = (req, res) => res.status(404).json('Route does not exists');

module.exports = notFoundHandler;
