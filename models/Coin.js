const { Sequelize, DataTypes } = require('sequelize');
const sequilize = require("../config/db.js");

const Coin = sequilize.define('Coin', {
    id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    rates: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Coin;