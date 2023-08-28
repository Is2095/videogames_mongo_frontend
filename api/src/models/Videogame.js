
const { Schema, model, Types} = require('mongoose')

const VideogameSchema = new Schema({
  name: { type: String, required: true, default: '.'},
  description: { type: String, required: true, default: ''},
  image: { type: String, required: true, default: ''},
  released: { type: String, required: true, default: ''},
  rating: { type: Number, required: true, default: 0},
  createdInDb: { type: Boolean, default: true},
  genres: { type: Array, default: []},
  platforms: { type: Array, default: []}
});

module.exports = model('Videogame', VideogameSchema);
