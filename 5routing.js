// routing means implementing differnt action for differnt urls

// include http and url module
// http for server connection ans url to analyze the url
const http = require("http");
const url = require("url");

// create a server and pass callback function
const server = http.createServer((req, res) => {
 // res.end("hello from the server (❁´◡`❁)");

//   console.log(req.url);
  const pathName = req.url;

  if (pathName === '/overview' || pathName === '/') {
    res.end("this is overview");
  } else if (pathName === '/product') {
    res.end("this is product");
  }
  else {

    // res.writeHead(404); // status code 
    // res.end("page not found"); 



    res.writeHead(404 , {
      'content-type' : 'text/html' ,
      'my-own-header' : 'hello-world'
    });

    res.end('<h1> page not found! <h1>');
  }
});

//listening to incoming request on local host ip and port

server.listen(8000, "127.0.0.1", () => {
  console.log("listening to port 8000");
});
