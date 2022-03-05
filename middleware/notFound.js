// middleware for handling 404 errors
const notFoundHandler = (req, res) => res.status(404).json({
    message: 'Route does not exist'
});

module.exports = notFoundHandler;
