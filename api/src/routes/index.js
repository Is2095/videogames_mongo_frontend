
const { Router } = require('express');

const routeVideoGames = require('./routeVideoGames');
const { getPlatforms, getGenres } = require('../controllers/index');

const router = Router();
// router.use('/', (req, res, next) =>{
// res.status(200).json('hola mundo')
//     // const jsonPost = req.body;
//     // const {name, image, description, releasedDate, rating, genres, platforms, createdInDb} = jsonPost;

//     // if(Object.keys(jsonPost).length !== 0){
//     //     if(!name || !image || !description || !platforms || !releasedDate || !rating || !genres || !createdInDb){

//     //         return res.status(404).json({error: 'Missing data'});
//     //     };
//     // };
//     // next()
// });

router.use('/videogames', routeVideoGames);
router.get('/genres', getGenres);
router.get('/platforms', getPlatforms);

module.exports = router;
