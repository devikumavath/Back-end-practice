const User = require('../models/userModel');
const Tour = require('./../models/tourModel');
const APIFeatures = require('./../utils/apiFeatures');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const factory = require('./handlerFactory');

const filterObj = (obj, ...allowedFileds) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFileds.includes(el)) newObj[el] = obj[el];
  });

  return newObj;
};


exports.getMe =  ( req , res , next) => {
  req.params.id = req.user.id;
  next();
};






// update current user data 💥
exports.updateMe = catchAsync(async (req, res, next) => {
  // 1) Create error if user POSTs password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        'This route is not for password updates. Please use /updateMyPassword.',
        400
      )
    );
  }
  // 2) Filtered out unwanted fields names that are not allowed to be updated
  const filteredBody = filterObj(req.body, 'name', 'email');
  // 3) Update user document
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser,
    },
  });
});

// deactivate or delete user account by user himself 💥
exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndDelete(req.user.id, { active: false });
  res.status(204).json({
    status: 'success',
    data: null,
  });
});

exports.createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'this route is not defined! please use /signUp instead ',
  });
};

exports.updateuser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'this route is not yet created',
  });
};


// user route handlers

// Do Not update passwords with this!
exports.updateuser = factory.updateOne(User);

exports.deleteuser = factory.deleteOne(User);

exports.getuser = factory.getOne(User);

exports.getAllUsers = factory.getAll(User);

// exports.getAllUsers = catchAsync(async (req, res) => {
//   const users = await User.find();

//   res.status(201).json({
//     status: 'success',
//     results: users.length,
//     data: {
//       users,
//     },
//   });
// });
