// include fs , http , url module

const fs = require("fs");
const http = require("http");
const url = require("url");

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObj = JSON.parse(data);
//console.log(dataObj);

const server = http.createServer((req, res) => {
  const pathName = req.url;

  if (pathName === "/overview" || pathName === "/") {
    res.end("this is overview");
  } else if (pathName === "/product") {
    res.end("this is product");
  } else if (pathName === "/api") {
    res.writeHead(200, {
      "context-type": "application/json"
    });

    res.end(data);
  } else {
    res.writeHead(404, {
      "content-type": "text/html",
      "my-own-header": "hello-world",
    });

    res.end("<h1> page not found! <h1>");
  }
});

server.listen(8000, "127.0.0.1", () => {
  console.log("listening to port 8000");
});
