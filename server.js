const app = require('./app');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const PORT = 8000;
console.log('Starting server ...')
app.listen(PORT, () => {
  console.log(`Running  on : ${PORT} ..`)
});

dotenv.config({ path: './config.env' });

mongoose.connect(process.env.DATABASE, {  
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
}).then(con => { console.log('🏛   接続 ｃｏｎｎｅｃｔｅｄ 接続  🏛 \n💻 ')});
  