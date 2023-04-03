const User = require('../models/userModel');
const Tour = require('./../models/tourModel');
const APIFeatures = require('./../utils/apiFeatures');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

const filterObj = (obj, ...allowedFileds) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFileds.includes(el)) newObj[el] = obj[el];
  });

  return newObj;
};

// user route handlers

exports.getuser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'this route is not yet created',
  });
};

exports.getAllUsers = catchAsync(async (req, res) => {
  const users = await User.find();

  res.status(201).json({
    status: 'success',
    results: users.length,
    data: {
      users,
    },
  });
});

exports.updateMe = catchAsync(async (req, res, next) => {
  //1) create error if user posts password data
  if (req.body.password || req.body.confirmpassword) {
    return next(
      new AppError(
        'This route is not for password updates . please use updateMyPassword.',
        400
      )
    );
  }

  //2) filtered out unwanted fields names that are not allowed to tbe updated
  const filteredBody = filterObj(req.body, 'name', 'email');

  //3) update user document
  const updatedUser = await User.findByIdAndUpdate(req.body.id, filteredBody, {
    new: true,
    runValdators: true,
  });

  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser,
    },
  });
});

exports.createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'this route is not yet created',
  });
};

exports.updateuser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'this route is not yet created',
  });
};

exports.deleteuser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'this route is not yet created',
  });
};

// deactivate or delete user account by user himself
exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndDelete(req.user.id, { active: false });
  res.status(204).json({
    status : 'success' ,
    data : null
  });
});
