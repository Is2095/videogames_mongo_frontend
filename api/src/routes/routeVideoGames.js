
const {Router} = require('express');

const routeVideoGames = Router();

const {getVideoGames, postVideoGames, getVideoGamesById} = require('../controllers/index');
const {getAllHandlersBd, getAllHandlersApi} = require('../handlers/index')

routeVideoGames.get('/db', getAllHandlersBd)

routeVideoGames.get('/api', getAllHandlersApi)

routeVideoGames.get('/', getVideoGames);

routeVideoGames.post('/', postVideoGames);

routeVideoGames.get('/:id', getVideoGamesById);

module.exports = routeVideoGames;
