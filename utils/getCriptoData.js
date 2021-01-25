const axios = require('axios').default;
const Coins = require("../models/Coin");
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];


const createCriptoMap = (cryMap, cryData, api) => {
    try {
        cryData.map(currency => {
            if (api == config.api.nomics) {
                cryMap.set(currency.id, {
                    name: currency.name,
                    price: currency.price
                })
            } else if (api == config.api.gecko) {
                cryMap.set(currency.symbol, {
                    name: currency.name,
                    price: currency.current_price
                })
            }
        })
    } catch (err) {
        console.log(err)
    }
}

const getData = async (path) => {

    try {
        console.log("usao get data");
        const response = await axios.get(path);
        console.log("p");
        // take only data part from whole response
        const cryData = response.data;
        const cryMap = new Map();

        // make map 
        createCriptoMap(cryMap, cryData, path);

        // delete everything in current table
        await Coins.destroy({
            truncate: true
        });

        // insert into database
        for (let [key, value] of cryMap) {
            await Coins.create({ id: key, name: value.name, rates: value.price });
        }
        console.log("All rows have been successfully added!")
    } catch (err) {
        console.log(err);
    }
}

module.exports = getData;