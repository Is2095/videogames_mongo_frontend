
const { postVGHandlers } = require('../handlers/index')

const postVideoGames = async (req, res) => {

    const {name, image, description, releasedDate, rating, genres, platforms, createdInDb} = req.body;
    const released = releasedDate;
        try {
            if(!name || !image || !description || !platforms || !releasedDate || !rating || !genres) {

            res.status(404).json({error: 'Missing data'})

            }else {
                const videogameCreado = await postVGHandlers(name, image, description, released, rating, genres, platforms, createdInDb)
                if (videogameCreado !== null) {
                    res.status(200).json(videogameCreado);
                }else res.status(404).json({message: 'Existing videogame'})
                
                
            } 
        } catch (error) {
         console.log(error,'eror en post controler');
            res.status(500).json(error)
        }
   
    
};

module.exports = postVideoGames;