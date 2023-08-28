
const server = require('./src/app');

require('dotenv').config();
const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
  console.log(`Listening at port --> ${PORT}`); 
});
