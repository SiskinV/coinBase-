const ErrorResponse = require("../utils/errorResponse");
const Coins = require("../models/Coin");


// @desc Gets all currencies id,name and price(rates)
// @route GET /api/v1/coins/getAllCoins
// @access Public
exports.getAllCurrencies = (async (req, res, next) => {
    try {
        const result = await Coins.findAll();
        return res.status(200).json({
            data: result,
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        return next(new ErrorResponse(
            'Error while trying to get currencies from database',
            500
        ))
    }
});