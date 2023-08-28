
const axios = require('axios');
const Videogame = require('../models/Videogame')
const connectMongo = require('../db')

require('dotenv').config();
const { API_KEY, URL_QUERY } = process.env;

const getQueryHandlers = async (name) => {

    connectMongo()
 
    let videosGamesAllName = [];
    let uno = {};
    let dos = {};
    let tres = {};
    let datos = [];
    let videosGamesApi= []
    
    uno = await axios.get(`${URL_QUERY}%${name}%&key=${API_KEY}&page_size=40`);

    if (uno.data.next !== null) {
        dos = await axios.get(uno.data.next)   
        if (dos.data.next !== null) {
            tres = await axios.get(dos.data.next)
            datos = uno.data.results.concat(dos.data.results.concat(tres.data.results))
        } else datos = uno.data.results.concat(dos.data.results);
    } else datos = uno.data.results
   
    if(uno.data.results.length !== 0) {
        videosGamesApi = datos?.map(e=> {
            return {
                id: e.id,
                name: e.name,
                image: e.background_image,
                release: e.released,
                rating: e.rating,
                createdInDb: false,
                platforms: e.platforms?.map(e => e.platform.name),
                genres: e.genres?.map(el => el.name)
            }
        });
    } else videosGamesApi = []

    const datosBD = await Videogame.find()
      
    let videosGamesBd = datosBD.filter(e=> e.name.toLowerCase().includes(name.toLowerCase()))

    videosGamesAllName = videosGamesApi.concat(videosGamesBd)

    return  videosGamesAllName

}

module.exports = getQueryHandlers;
