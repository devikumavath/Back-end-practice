const { rejects } = require("assert");
const fs = require("fs");
const { resolve } = require("path");
const superagent = require("superagent");

/////////////////////////////// 💥
// fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
//   console.log(`breed : ${data}`);

//   fs.writeFile("dog-img.txt", (err, data) => {
//     console.log(`breed : ${data}`);
//   });
// });

////////////////////////// callback hell //////////////////// 💥

// fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
//   console.log(`breed : ${data}`);

//   superagent
//     .get(`https://dog.ceo/api/breed/${data}/images/random`)
//     .end((err, res) => {
//       if (err) {
//         return console.log(err.message);
//       }

//       console.log(res.body);

//       fs.writeFile("dog-img.txt", res.body.message, (err) => {
//         if (err) {
//           return console.log(err.message);
//         }

//         console.log("random image saved to file ✅");
//       });
//     });

// });

//////////////////////////////////////////////////////////  💥

// fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
//   console.log(`breed : ${data}`);

//   superagent.get(`https://dog.ceo/api/breed/${data}/images/random`).then(res  => {
//       console.log(res.body.message);

//       fs.writeFile("dog-img.txt", res.body.message, err => {
//        if (err) return console.log(err.message);
//         console.log("random image saved to file ✅");
//       });
//     }).catch( err => {
//      console.log(err.message);
//     });
// });


///////////////////////////////////////////////////////💥
// building promises 

const readfilePro = file => {

    return new Promise((resolve, reject) => {
    // return new promise((resolve , rejects) => {  --- wrong 
        fs.readFile(file , (err , data) =>{
            if(err) rejects('cannot find file ');

            resolve(data);
        });
    });
};

readfilePro(`${__dirname}/dog.txt`).then(data => {

    console.log(`breed : ${data}`);

  return  superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
}).then(res => {
    console.log(res.body.message);

    fs.writeFile("dog-img.txt", res.body.message, err => {
               if (err) return console.log(err.message);
                console.log("random image saved to file ✅");
              });
            }).catch( err => {
             console.log(err.message);
            });




