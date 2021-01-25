const ErrorResponse = require("../utils/errorResponse");
const Coins = require("../models/Coin");

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
        next(new ErrorResponse(
            'Error while trying to get currencies from database',
            500
        ))
    }
});