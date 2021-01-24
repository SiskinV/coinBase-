const ErrorResponse = require("../utils/errorResponse");
const Coins = require("../models/Coin");

exports.getAllCurrencies = (async (req, res, next) => {

    Coins.findAll().then((result) => {
        return res.status(200).json({
            data: result,
        });
    }).catch((err) => {
        console.log(err)
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(
            new ErrorResponse(
                'Error while trying to get from database',
                500
            )
        );
    })
});