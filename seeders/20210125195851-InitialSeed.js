'use strict';

const Coins = require("../models/Coin")
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const axios = require('axios').default;
module.exports = {
  up: async (queryInterface, Sequelize) => {

    const response = await axios.get(config.api.gecko);

    // take only data part from whole response
    const cryData = response.data;
    const cryMap = new Map();

    cryData.map(currency => {
      cryMap.set(currency.symbol, {
        name: currency.name,
        price: currency.current_price
      })
    })
    for (let [key, value] of cryMap) {
      await Coins.create({ id: key, name: value.name, rates: value.price });
    }
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await Coins.destroy({
      truncate: true
    });
  }
};
