// including fs and http module

// fs(file system) module is to read and write in the file
// http module is to networking and bulding the http server
const fs = require("fs");
const http = require("http");

//////////////////////////////////////
// file system
// to read file

fs.readFile("./txt/start.txt", "utf-8", (err, data) => {
  console.log(data);
});

//////////////////////////////////////
// server
// created server and  passed callback function
const server = http.createServer((req, res) => {
 //   console.log(req);
  res.end("hello from the server!");
});

// listening to incoming request on local host ip and port
server.listen(8000, "127.0.0.1", () => {
  console.log("listening to requests on port 8000");
});

// to run
// go to web browser > type 127.0.0.1:8000 > enter
