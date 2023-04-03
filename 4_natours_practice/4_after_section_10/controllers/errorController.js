const AppError = require('../utils/appError');

const handleCastErrorDB = (err) => {
  const message = `INVALID ${err.path} : ${err.value}.`;

  return new AppError(message, 400);
};

const handleDuplicateFiledsDB = (err) => {
  const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
  console.log(value);
  const message = `Duplicate field value : ${value} please use another value!`;

  return new AppError(message, 400);
};


const handleValidationErrorDB = ()=> {

  const errors = Object.values(err.errors).map(el => el.message);

  const message = `invalid input data. ${errors.join('. ')}`;
  return new AppError(message , 400);


}

// function to handle invalid token
const handleJWTError = err => new AppError('invalid token . please login again' ,401);

// function to handle expired token 
const  handleJWTExpiredError = err => new AppError('your token has expired ! please login again' , 401);

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error: err,
    stack: err.stack,
  });
};

const sendErrorProd = (err, res) => {
  // operational , trusted error : send message to client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }
  // programming or other unknow error : dont want to leak error details
  else {
    // 1) log error

    console.log('ERROR 💥', err);

    // send generic message
    res.status(500).json({
      status: 'error',
      message: 'something went wrong',
    });
  }
};

module.exports = (err, req, res, next) => {
  // console.log(err.stack);
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = { ...err };

    if (error.name === 'CastError') error = handleCastErrorDB(error);

    if (error.code === 11000) error = handleDuplicateFiledsDB(error);

    if(error.name === 'validationError') error = handleValidationErrorDB;

    //  to handle invalid token 
    if(error.name === 'JsonWebTokenError') error = handleJWTError();

    // to handle expired token 
    if(error.name === 'TokenExpiredError')  error  = handleJWTExpiredError();

    sendErrorProd(error, res);
  }
};
