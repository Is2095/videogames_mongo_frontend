
const { Platform } = require('../db');

const {getPlatformHandlres} = require('../handlers/index')

const getPlatforms = async (req,res) => {

    try {
    
        const platfomsGames = await getPlatformHandlres();
        res.status(200).json(platfomsGames)
    
    } catch (error) {

        res.status(500).json({error:error.message})

    };
};

module.exports = getPlatforms;
