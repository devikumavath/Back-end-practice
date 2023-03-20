//1) import modules  🔍✅
const fs = require('fs');
const express = require('express');
const json = require('express');
const morgan = require('morgan');
const tourRouter = express.Router();
const userRouter = express.Router();

const app = express();

// 2) middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log('hello from the middleware');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use(morgan('dev'));
// app.use(morgan('tiny'));

//top level code is only executed only once when app is started
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

// 3) route handlers ✅🔍
// tour router handlers
const getAllTours = (req, res) => {
  console.log(req.requestTime);

  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    results: tours.length,
    data: {
      // tours : tours
      tours,
    },
  });
};

const createTour = (req, res) => {
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
};

const getTour = (req, res) => {
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
};

const updateTour = (req, res) => {
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
};

const deleteTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({ status: 'fail', message: 'invalid id ' });
  }

  res.status(204).json({
    status: 'success',

    data: null,
  });
};

// user route handlers

const getAllUsers = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'this route is not yet created',
  });
};

const createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'this route is not yet created',
  });
};

const getuser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'this route is not yet created',
  });
};

const updateuser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'this route is not yet created',
  });
};

const deleteuser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'this route is not yet created',
  });
};

// 4) routes 🔍✅

// app.get('/api/v1/tours', getAllTours);
// app.post('/api/v1/tours', createTour);
// app.get('/api/v1/tours/:id', getTour);
// app.patch('/api/v1/tours/:id', updateTour);
// app.delete('/api/v1/tours/:id', deleteTour);

//or

// tours route
tourRouter.route('/').get(getAllTours).post(createTour);

tourRouter.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

// users route
userRouter.route('/').get(getAllUsers).post(createUser);

userRouter.route('/:id').get(getuser).patch(updateuser).delete(deleteuser);

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

//5)  starting server  🔍✅
const port = 3000;
app.listen(port, () => {
  console.log(`app running on the port ${port}`);
});
