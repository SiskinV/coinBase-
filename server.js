const express = require("express");
const dotenv = require("dotenv");
const errorHandler = require("./middlewares/error");
const morgan = require("morgan");
const cors = require("cors");
const job = require("./utils/cron");

//Load env vars
dotenv.config({ path: "./config/config.env" });

//Route files
const coins = require("./routes/coin-routes");

const app = express();

app.use(cors());

//Body parser
app.use(express.json());

// Dev logging middleware
if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

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