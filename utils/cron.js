var CronJob = require('cron').CronJob;
const getData = require("./getCriptoData");
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];

var job = new CronJob('0 42 * * * *', () => {
    console.log('You will see this message every hour');
    getData(config.api.gecko);
}, null, true, 'America/Los_Angeles');

module.exports = job;