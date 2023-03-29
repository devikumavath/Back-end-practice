//1) import modules  🔍✅
const express = require('express');
const morgan = require('morgan');

const appError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

// 2) middleware
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.static(`${__dirname}/public`));

app.use(express.json());

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
 // console.log(req.headers);
  next();
});



// 3) route handlers ✅🔍

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {


  next(new appError(`cant find ${req.originalUrl} on this server !` , 404));
});

// global error middleware handler 
app.use(globalErrorHandler);

module.exports = app;
