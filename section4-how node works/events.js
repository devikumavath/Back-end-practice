const EventEmitter = require("events");
const http = require("http");


class Sales extends EventEmitter {
    
    constructor(){
        super();
        
    }
}


const myEmitter = new EventEmitter();


myEmitter.on("newSale", () => {
  console.log("there was a new sale");
});

myEmitter.on("newSale", () => {
  console.log("customer name : devi");
});

myEmitter.on('newSale' , stock => {
    console.log(`there are now ${stock} items in stock`);
})

myEmitter.emit("newSale" , 9 );



///////////////////////////////////////////////

// create a webserver and listen to events
const server = http.createServer();

// on() - listening to a event
server.on('request' , (req , res) => {
    console.log("request received");
    console.log(req.url);
    res.end("request received");
});


server.on('request' , (req , res) => {
   
    console.log("another request 😀");
});


server.on('close' , (req , res) => {
   
    console.log("server close 🤷‍♂️");
});

// start server
server.listen(8000 , '127.0.0.1' , ()=> {
    console.log("waiting for requests.....");
});

