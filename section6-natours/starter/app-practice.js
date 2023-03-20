// practing crud operation , http methods , route and ruote handler 

const fs = require('fs');
const express = require('express');
const { json } = require('express');

const app = express();

//middleware
app.use(express.json());

// // routing
// // get - http method for request
// app.get('/', (req, res) => {

//   // res.send('hello from the server side');
//   // res.status(200).send('hello from the server side');

//   res.status(200).json({ message: 'hello from the server side', app: ' natuors' });
//   // test on post man
// });

// //post method
// app.post('/' , (req , res) => {
//     res.send('you can post to this input');
// } )

//top level code is only executed only once when app is started

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

// get request method
app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      // tours : tours
      tours,
    },
  });
});

// post request method
app.post('/api/v1/tours', (req, res) => {
  // console.log(req.body);

  const newId = tours[tours.length - 1].id + 1;

  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );

  // res.send('done');
});

// get request method  --- define a route which can accept variable(parametes)
app.get('/api/v1/tours/:id', (req, res) => {
  console.log(req.params);
  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);

  // if (id > tours.length)
  if (!tour) {
    return res.status(404).json({ status: 'fail', message: 'invalid id ' });
  }

  res.status(200).json({
    status: 'success',
    //  results : tours.length ,
    data: {
      // tours : tours
      tour,
    },
  });
});

// patch request method -- to update
app.patch('/api/v1/tours/:id', (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({ status: 'fail', message: 'invalid id ' });
  }

  res.status(200).json({
    status: 'success',

    data: {
      // tours : tours
      tour: '<updated tour here....',
    },
  });
});

// delete request method
app.delete('/api/v1/tours/:id', (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({ status: 'fail', message: 'invalid id ' });
  }

  res.status(204).json({
    status: 'success',

    data: null,
  });
});

// starting server
const port = 3000;
app.listen(port, () => {
  console.log(`app running on the port ${port}`);
});
