
const Videogame  = require('../models/Videogame')

const connectMongo = require('../db')

const getAllHandlersBd = async (req, res) => {

    connectMongo()
   
    const datosBD = await Videogame.find()

    if(datosBD.length !== 0) {
        return res.status(200).json(datosBD);
    } else   return res.status(400).json({message: 'Database no Data'});
};

module.exports = getAllHandlersBd;
