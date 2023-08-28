
const {getGenresHandlres} = require('../handlers/index');

const getGenres = async (req, res) => {
   
    try {
    
       const genresGames = await getGenresHandlres()
       res.status(200).send(genresGames)    
    
    } catch (error) {
    
        res.status(500).json({error: error.message})
    
    }
};

module.exports = getGenres;
