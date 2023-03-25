/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable prettier/prettier */

const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const app = require('./app');



const DB = process.env.DATABASE.replace('<PASSWORD>' , process.env.DATABASE_PASSWORD);

mongoose.connect(DB , {
  /*useNewUrlparser:true ,
  useCreateIndex : true ,
useFindAndModify : false }*/})
  .then(  () => {
  //  console.log(con.connections);
    console.log("DB connected successfully");
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

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`app running on the port ${port}`);
});
