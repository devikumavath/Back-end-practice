//1) import modules  🔍✅
const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const appError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

// 2) global  middleware  🔍✅

// 1) set security http header
app.use(helmet());

//2) development logging
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// 3)servering static files
app.use(express.static(`${__dirname}/public`));

// 4)body parser , reading data from body into req.body
app.use(express.json({ limit: '10kb' }));

// 5)data sanitization against NOSQL query injection
app.use(mongoSanitize());

// 6)data sanitization aganist xss
app.use(xss());

// 7)prevent parameter pollution
app.use(
  hpp({
    whitelist: [
      'duration',
      'ratingsQuantity',
      'ratingsAverage',
      'maxGroupSize',
      'difficulty',
      'price',
    ],
  })
);

// 8)limit request from same ip

const limiter = rateLimit({
  max: 100,
  windowMS: 60 * 60 * 1000,
  message: 'Too many request from this IP , please try again in an hour!',
});
app.use('/api', limiter);

// test middleware

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  // console.log(req.headers);
  next();
});

// 3) route handlers ✅🔍

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
  next(new appError(`cant find ${req.originalUrl} on this server !`, 404));
});

// global error middleware handler
app.use(globalErrorHandler);

module.exports = app;
