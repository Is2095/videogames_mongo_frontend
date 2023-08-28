
const {getQueryHandlers, getAllHandlers} = require('../handlers/index');

const getVideoGames = async (req, res) => {
     const {name} = req.query;    
     
     try {
          
          let videosGames = name 
               ?  await getQueryHandlers(name)
               :  await getAllHandlers();  
          return res.status(200).json(videosGames);
     } catch (error) {
          return res.status(400).json({error: error.message});      
     }     
};

module.exports = getVideoGames;
