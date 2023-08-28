
const Videogame = require('../models/Videogame')
const connectMongo = require('../db')

const getByIdBDHandlers = async (id) =>{

    connectMongo()

    const [videosgameBD] = await Videogame.find({_id:id})
    if(videosgameBD) {
        return videosgameBD;
    } else  return 'Videogame not found';
}

module.exports = getByIdBDHandlers;
