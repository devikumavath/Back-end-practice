const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');



const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    confirmpassword: req.body.confirmpassword,
  });

  const token = signToken(newUser._id);

  res.status(201).json({
    status: 'success',
    token,
    data: {
      user: newUser,
    },
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  //1) check if email and password exist
  if (!email || !password) {
    return next(new AppError('please provide email and password', 400));
  }

  //2) check if user exists && password is correct

  const user = await User.findOne({ email }).select('+password');
  //console.log(user);

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('incorrect email or password', 401));
  }

  //3) if everything ok , send token to client
  const token = signToken(user._id);
  // console.log(token);
  res.status(200).json({
    status: 'success',
    token,
  });
});


// route protecting 
exports.protect = catchAsync(async (req, res, next) => {
  // 1)getting the token & check if it exists
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
    // console.log(token);

    if (!token) {
      return next(
        new AppError('you are not logged in! please login to get access.', 401)
      );
    }
  }

  //2) verification token

  const decode = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  //  console.log(decode);

  //3)check if user still exists

  const currentUser = await User.findById(decode.id);
  if (!currentUser) {
    return next(
      new AppError(
        'the user belonging to this token does no longer exist.',
        401
      )
    );
  }

  //4)check if user change password after token issued
  if (currentUser.changePasswordAfter(decode.iat)) {
    return next(
      new AppError('user recently changed password! please login again.', 401)
    );
  }

  // grant access to protected route 
  req.user = currentUser;
  next();
});
