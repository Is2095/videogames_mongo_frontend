
const axios = require('axios');

require('dotenv').config();
const { API_KEY, URL_VIDEOSJUEGOS } = process.env;

const getAllHandlersApi = async (req, res) => {

    let one = {};
    let two = {};
    let tree = {};
    let datos = [];

    one = await axios(`${URL_VIDEOSJUEGOS}${API_KEY}&page_size=40`);

     if(one.data.next !== null) {
        two = await axios(one.data.next);
            if(two.data.next !== null) {
                tree = await axios(two.data.next)
                datos = one.data.results.concat(two.data.results.concat(tree.data.results))
            } else datos = one.data.results.concat(two.data.results) 
     }else datos = one.data.resuls

    if(datos.length !== 0) {
        const datosFiltrados = datos.map(e => {
            return {
                id: e.id,
                name: e.name,
                image: e.background_image,
                release: e.released,
                rating: e.rating,
                createdInDb: false,
                platforms: e.platforms.map(e => e.platform.name),
                genres: e.genres.map(el => el.name)
            }
        })
        return res.status(200).json(datosFiltrados);
    } else res.status(500).json({message:'Data no found'})
};

module.exports = getAllHandlersApi;