
const axios = require('axios');

require('dotenv').config();
const { API_KEY, URL_PLATFORMS } = process.env;

const getPlatformHandlres = async () => {
    const platform = await  axios(URL_PLATFORMS + API_KEY)
    const platformGames = platform.data.results.map(ele=>ele.name)
    return platformGames;
};

module.exports = getPlatformHandlres;
