require('dotenv').config();

const mongoose = require('mongoose');

const {MONGODB_URI_LOCAL, MONGODB_URI_VERCEL} = process.env;

async function connectMongo() {

  try {
    await mongoose.connect(MONGODB_URI_LOCAL, {
      useNewUrlParser: true,
      useUnifiedTopology: true, 
      autoIndex: true,
      w: 'majority' 
    })
    console.log('conexión con EXITO')
  } catch (error) {
    console.log(error)
  }
}

module.exports = connectMongo;


