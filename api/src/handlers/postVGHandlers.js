
const Videogame = require('../models/Videogame')
const connectMongo = require('../db')

const postVGHandlers = async (name, image, description, released, rating, genres, platforms, createdInDb) => {

        connectMongo()
    
        const videoExistente = await Videogame.findOne({name})

    if(videoExistente === null){
            const videoNew = new Videogame({
                name,
                image,
                description,
                released,
                rating,
                createdInDb,
                genres,
                platforms
            });
            await videoNew.save()
            return videoNew
        } else  return null
 
}

module.exports = postVGHandlers;
