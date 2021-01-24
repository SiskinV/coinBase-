const Sequilize = require("sequelize");

const sequilize = new Sequilize("coinBase", "postgres", "Vlada123", {
    dialect: "postgres",
    host: "localhost"
});

module.exports = sequilize;