// importing async wrapper
const asyncWrapper = require('../utils/asyncWrapper');

// importing models
const Transaction = require('../models/Transaction');

// GET /accounts/:id/available-amount
// PRIVATE
// for getting sum of all transactions of current account
exports.getCategoryStatistics = asyncWrapper(async (req, res, next) => {
    const totalAmount = await Transaction.aggregate([
        {
            $match: {
                transactionType: 'Expense',
                transactionDate: {
                    $gte: new Date(req.body.startDate),
                    $lte: new Date(req.body.endDate)
                }
            }
        },
        {
            $group: {
                _id: null,
                totalAmount: { $sum: '$amount' }
            }
        }
    ]);
    
    const statistics = await Transaction.aggregate([
        {
            $match: {
                transactionType: 'Expense',
                transactionDate: {
                    $gte: new Date(req.body.startDate),
                    $lte: new Date(req.body.endDate)
                }
            }  
        },
        {
            $group: {
                _id: '$category',
                amount: { $sum: '$amount' }
            }
        }
    ]);

    res.status(200).json({ totalAmount, statistics });
});
