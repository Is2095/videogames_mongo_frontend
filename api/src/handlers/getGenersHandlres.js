
const axios = require('axios')

require('dotenv').config
const { API_KEY, URL_GENRES } = process.env;

const getGenresHandlres = async () => {
      const genres = await axios.get(URL_GENRES + API_KEY)
      const genresGames = genres.data.results.map(ele => ele.name)
      return genresGames
};

module.exports = getGenresHandlres;
