const crypto = require('crypto');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const Email = require('./../utils/email');
const { create } = require('../models/tourModel');
const { token } = require('morgan');

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);

  // sending jwt via cookie  💥
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

  res.cookie('jwt', token, cookieOptions);

  // remove password from output
  user.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
};

// user signup 💥
exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create(req.body);
    const url = `${req.protocol}://${req.get('host')}/me`;
    console.log(url);
 await  new Email(newUser , url).sendWelcome();

  createSendToken(newUser, 201, res);
});

// user login 💥

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
  createSendToken(user, 200, res);
});

// logout user from the page
exports.logout = (req, res) => {
  res.cookie('jwt', 'loggedout', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });

  res.status(200).json({ status: 'success' });
};

//  protect tours 💥
exports.protect = catchAsync(async (req, res, next) => {
  // 1)getting the token & check if it exists
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
    // console.log(token);
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return next(
      new AppError('you are not logged in! please login to get access.', 401)
    );
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
  res.locals.user = currentUser;
  next();
});

//isLoggedIn 💥  (only for rendered pages , no errors)
exports.isLoggedIn = async (req, res, next) => {
  // console.log('isLoggedIn middleware called');
  if (req.cookies.jwt) {
    // console.log('JWT cookie found:', req.cookies.jwt);
    try {
      // 1) Verify token
      const decoded = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRET
      );
      // console.log('Token verified:', decoded);

      // 2) Check if user still exists
      const currentUser = await User.findById(decoded.id);
      if (!currentUser) {
        // console.log('User not found in database');
        return next();
      }
      // console.log('Current user:', currentUser);

      // 3) Check if user changed password after the token was issued
      if (currentUser.changePasswordAfter(decoded.iat)) {
        // console.log('User changed password after token was issued');
        return next();
      }

      // GRANT ACCESS TO PROTECTED ROUTE
      res.locals.user = currentUser;
      return next();
    } catch (err) {
      // console.log('Error verifying token:', err);
      return next();
    }
  }
  // console.log('No JWT cookie found');
  next();
};

//MIDDLE WARE FUNCTION TO RESTRICT THE PERSON WHO CAN DELETE THE TOURS  - admin , lead-guide  💥
exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    //roles ['admin' , 'lead-guide']  , role='user'
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError('you do not have permission to perform this action ', 403)
      );
    }
    next();
  };
};

//forgot password  💥

exports.forgotPassword = catchAsync(async (req, res, next) => {
  // 1) Get user based on POSTed email
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new AppError('There is no user with email address.', 404));
  }

  // 2) Generate the random reset token
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  // 3) Send it to user's email
  
  // const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${resetURL}.\nIf you didn't forget your password, please ignore this email!`;
  
  try {
    // await sendEmail({
      //   email: user.email,
      //   subject: 'Your password reset token (valid for 10 min)',
      //   message,
      // });

      
      const resetURL = `${req.protocol}://${req.get(
        'host'
      )}/api/v1/users/resetPassword/${resetToken}`;

    await new Email(user , resetURL).sendPasswordReset();

    res.status(200).json({
      status: 'success',
      message: 'Token sent to email!',
    });
  } catch (err) {
    // console.log(err);
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });

    return next(
      new AppError('There was an error sending the email. Try again later!'),
      500
    );
  }
});

// reset password 💥
exports.resetPassword = catchAsync(async (req, res, next) => {
  //1)get user based on token

  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  //2) if token has not expired and there is user ,  set the new password

  if (!user) {
    return next(new AppError('token is invalid or has expired', 400));
  }
  user.password = req.body.password;
  user.confirmpassword = req.body.confirmpassword;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();
  //3) update changepasswordAT property fot the  current user

  //4) log the user in , send jwt
  createSendToken(user, 200, res);
});

// update the current user : password  💥

exports.updatePassword = catchAsync(async (req, res, next) => {
  // 1) get user from collection
  const user = await User.findById(req.user.id).select('+password');

  //2) check if posted current password is correct
  if (!(await user.correctPassword(req.body.passwordCurrent, user.password))) {
    return next(new AppError('your current password is worng.', 401));
  }

  //3) if so , update password

  user.password = req.body.password;
  user.confirmpassword = req.body.confirmpassword;
  await user.save();
  //user.findByIdAndUpdate will not work as intended!

  //4) log user in , send jwt
  createSendToken(user, 200, res);
});
