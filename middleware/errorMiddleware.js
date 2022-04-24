// middleware for handling errors
const errorHandler = (err, req, res, next) => {
    if (err.name === 'ValidationError') {
        const errors = {};

        Object.keys(err.errors).forEach((key) => {
            errors[key] = err.errors[key].message;
        });
        
        return res.status(400).json(errors);
    }

    const statusCode = res.statusCode ? res.statusCode : 500;

    res.status(statusCode);
    res.json(err.message);
};

module.exports = errorHandler;
