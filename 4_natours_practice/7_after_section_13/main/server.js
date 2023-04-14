/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable prettier/prettier */

const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const app = require('./app');
const process = require('process');

process.on('unhandledException', (err) => {
  console.log(err.name, err.message);
  console.log('unhandled exception shutting down.........');
  // console.log(err.name, err.message);

  process.exit(1);
});
// const devData = require('./dev-data/data/import-dev-data');
const { db } = require('./models/tourModel');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

// console.log('DB', DB);

mongoose
  .connect(DB, {
    //     useNewUrlparser:true ,
    //   useCreateIndex : true ,
    // useFindAndModify : false
    // useNewUrlparser: true,
    // writeConcern: { w: 'majority ', j: true, wtimeout: 1000 },
  })
  .then(() => {
    //  console.log(con.connections);
    console.log('DB connected successfully');
  });

// const testTour = new Tour({
//   name : "The Forest Hiker" ,
//   rating : 4.7 ,
//   price : 497
// });

// testTour.save().then(doc => {
//   console.log(doc);
// }).catch(err => {
//   console.log(' ERROR 💥:' , err)
// })

// console.log(process.env);
// console.log(app.get('env'))

//5)  starting server  🔍✅

// console.log('process.argv in server', process.argv);

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`app running on the port ${port}`);
});

process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  console.log('unhandled rejection shutting down.........');
  console.log(err);
  server.close(() => {
    process.exit(1);
  });
});
