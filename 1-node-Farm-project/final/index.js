// include fs , http , url module

const fs = require("fs");
const http = require("http");
const url = require("url");
const slugify = require('slugify');
const replaceTemplate = require('./modules/replaceTemplate');

// server

// function
// regular expression / /g (g-global)
// const replaceTemplate = (temp, product) => {
//   let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
//   output = output.replace(/{%IMAGE%}/g, product.image);
//   output = output.replace(/{%PRICE%}/g, product.price);
//   output = output.replace(/{%FROM%}/g, product.from);
//   output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
//   output = output.replace(/{%QUANTITY%}/g, product.quantity);
//   output = output.replace(/{%DESCRIPTION%}/g, product.description);
//   output = output.replace(/{%ID%}/g, product.id);

//   if (!product.organic)
//     output = output.replace(/{%NOT_ORGANIC%}/g, "not-organic");
//   return output;
// };

// importing replaceTemplate function from our own module

const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, "utf-8");
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, "utf-8");
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, "utf-8");

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObj = JSON.parse(data);
//console.log(dataObj);


// slugs of productName
// const slugs = dataObj.map(el => slugify(el.productName , {lower : true}));
// console.log(slugs);

// console slugify
//console.log(slugify('FRESH-AVOCADOS' , {lower : true}));

const server = http.createServer((req, res) => {
  // console.log(req.url);
  // console.log(url.parse(req.url , true));
  // const pathName = req.url;

  const { query, pathname } = url.parse(req.url, true);

  //overview page 💥
  if (pathname === "/overview" || pathname === "/") {
    res.writeHead(200, {
      "context-type": "application/json",
    });

    const cardsHtml = dataObj
      .map((el) => replaceTemplate(tempCard, el))
      .join(" ");
    // console.log(cardsHtml);

    const output = tempOverview.replace("{%PRODUCT_CARDS%}", cardsHtml);

    res.end(output);
  }

  //product page 💥
  else if (pathname === "/product") {
    // console.log(query);
    res.writeHead(200, {
      "context-type": "application/json",
    });
    const product = dataObj[query.id];

    const output = replaceTemplate(tempProduct, product);

    res.end(output);

    // res.end("this is product");
  }

  // API 💥
  else if (pathname === "/api") {
    res.writeHead(200, {
      "context-type": "application/json",
    });

    res.end(data);
  }

  //not found 💥
  else {
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
