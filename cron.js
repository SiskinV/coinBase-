var CronJob = require('cron').CronJob;
const axios = require('axios').default;
const Coins = require("./models/Coin");
const dotenv = require("dotenv");

var job = new CronJob('0 0 * * * *', () => {
    console.log('You will see this message every hour');
    getData(`https://api.nomics.com/v1/currencies/ticker?key=${process.env.API_KEY}`, process.env.API_NOMICS);
    //getData(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false`, process.env.API_GECKO);
}, null, true, 'America/Los_Angeles');

const createMap = (myMap, cryData, num) => {
    try {
        cryData.map(currency => {
            if (num == 1) {
                myMap.set(currency.id, {
                    name: currency.name,
                    price: currency.price
                })
            } else if (num == 2) {

                myMap.set(currency.symbol, {
                    name: currency.name,
                    price: currency.current_price
                })
            }
        })
    } catch (err) {
        console.log(err)
    }
}

const getData = async (path, num) => {

    try {
        const response = await axios.get(path);

        // take only data part from whole response
        const cryData = response.data;
        const myMap = new Map();

        // make map 
        createMap(myMap, cryData, num);

        // Check myMap
        // console.log(myMap);

        // delete everything in current table
        await Coins.destroy({
            truncate: true
        });

        // insert into database
        for (let [key, value] of myMap) {
            //console.log(key + " = " + value.name + " " + value.price);
            await Coins.create({ id: key, name: value.name, rates: value.price });
        }
    } catch (err) {
        console.log(err);
    }
}

module.exports = job;