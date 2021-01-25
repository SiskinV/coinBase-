const express = require("express");
const dotenv = require("dotenv");
const errorHandler = require("./middlewares/error");
const morgan = require("morgan");
const sequelize = require("./config/db");
const cors = require("cors");
var CronJob = require('cron').CronJob;

//Load env vars
dotenv.config({ path: "./config/config.env" });

//Route files
const coins = require("./routes/coin-routes");

const job = require("./cron");

const app = express();

app.use(cors());

//Body parser
app.use(express.json());

// Dev logging middleware
if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

app.use(async (req, res, next) => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        next();
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
});

app.use("/api/v1/coins", coins);

job.start();

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(
    PORT,
    console.log(
        `Server is running on ${PORT} port`
    )
);