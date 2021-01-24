const express = require("express");

const {
    getAllCurrencies,
} = require("../controllers/coin-controller");

const router = express.Router();

router.route("/getAllCoins").get(getAllCurrencies);

module.exports = router;