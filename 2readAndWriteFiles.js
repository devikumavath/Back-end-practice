// console.log("hiii");

// blocking - synchronous way 📑

//to read the file

const fs = require("fs");
// const textInput = fs.readFileSync('./txt/input.txt' , 'utf-8' );
//  console.log(textInput);

//to write the file

// const textOutput = `this is what we know about avcado : ${textInput}. \n create on ${Date.now()}`;
// fs.writeFileSync('./txt/output.txt' , textOutput);
// console.log("file written");

// non-blocking - Asynchronous way   📑

// console.log("before callback function");

// to read file

// fs.readFile("./txt/start.txt", "utf-8", (err, data) => {
//   console.log(data);
// });

// to read file
// fs.readFile("./txt/start.txt", "utf-8", (err, data1) => {
//   fs.readFile(`./txt/${data1}.txt`, "utf-8", (err, data2) => {
//     console.log(data2);
//   });
// });

// callback hell function
fs.readFile("./txt/start.txt", "utf-8", (err, data1) => {
    if (err) {
 
        // change start.txt to starttt.txt to  see error 
       return  console.log("ERROR! 😬");
        
    }
    fs.readFile(`./txt/${data1}.txt`, "utf-8", (err, data2) => {
        fs.readFile(`./txt/append.txt`, "utf-8", (err, data3) => {
            console.log(data3);

            fs.writeFile('./txt/final.txt' , ` ${data2} \n ${data3} ` , 'utf-8' , (err)=> {

                // to write file

               console.log("you file has been written 😀 ");
            });
          });
    });
  });

// this will display first because callback fun will run in background and it will not block other stmt
 console.log("will read file first !");

// // normal fun
// function add(a, b) {
//   console.log(`using normal  function  \n add of ${a} and ${b} is ${a + b} `);
// }

// add(5, 5);

// // arrow function
// sub = (a, b) => {
//   console.log(`using arrow function \n sub of ${a} and ${b} is ${a - b} `);
// };

// sub(5, 5);
