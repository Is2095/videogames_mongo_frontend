
const axios = require('axios');

const Videogame  = require('../models/Videogame')
const connectMongo = require('../db')

require('dotenv').config();
const { API_KEY, URL_VIDEOSJUEGOS } = process.env;

const getAllHandlers = async () => {
    connectMongo()

    const one = await axios(`${URL_VIDEOSJUEGOS}${API_KEY}&page_size=40`);
    const two = await axios(one.data.next);
    const tree = await axios(two.data.next);

    const datos = one.data.results.concat(two.data.results.concat(tree.data.results));

    const datosFiltrados = datos.map(e => {
        return {
            id: e.id,
            name: e.name,
            image: e.background_image,
            release: e.released,
            rating: e.rating,
            createdInDb: false,
            platforms: e.platforms.map(e => e.platform.name),
            genres: e.genres.map(el => el.name)
        }
    })
    const gamesDB = await Videogame.find()
    const allGames = datosFiltrados.concat(gamesDB)
   
    return allGames
};

module.exports = getAllHandlers;