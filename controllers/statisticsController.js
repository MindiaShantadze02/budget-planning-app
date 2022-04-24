// importing async wrapper
const asyncWrapper = require('../utils/asyncWrapper');

// importing models
const Transaction = require('../models/Transaction');

// GET /accounts/:id/available-amount
// PRIVATE
// for getting sum of all transactions of current account
exports.getCategoryStatistics = asyncWrapper(async (req, res, next) => {
    const statistics = await Transaction.aggregate([
        {
            $group: {
                _id: '$category',
                sum: {
                    $sum: '$amount'
                }
            }
        }
]);

    res.status(200).json(statistics);
});
