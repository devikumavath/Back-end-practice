/* eslint-disable prettier/prettier */
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const app = require('./app');

// console.log(process.env);

// console.log(app.get('env'))

//5)  starting server  🔍✅
// process.env.PORT ||
const port = 3000;
app.listen(port, () => {
  console.log(`app running on the port ${port}`);
});
