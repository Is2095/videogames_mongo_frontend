
const {getByIdApiHandlers, getByIdBDHandlers} = require('../handlers/index')

const getVideoGamesById = async (req, res) => {

    const { id } = req.params;
    try {
        if (id.length > 10)  {
            const gamesBD = await getByIdBDHandlers(id)
            return res.status(200).json(gamesBD)
        }else {
            const gamesApi = await getByIdApiHandlers(id);
            return res.status(200).json(gamesApi)} 
    } catch (error) {
        res.status(500).json({error:error.message})
    }; 
};

module.exports = getVideoGamesById;
