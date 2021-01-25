const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require("../config/db.js");

const Coin = sequelize.define('Coin', {
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