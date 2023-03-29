const User = require('../models/userModel');
const Tour = require('./../models/tourModel');
const APIFeatures = require('./../utils/apiFeatures');
const catchAsync = require('./../utils/catchAsync');

// user route handlers

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

exports.createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'this route is not yet created',
  });
};
  
 exports.getuser = (req, res) => {
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