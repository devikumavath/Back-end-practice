//import packages
const mongoose = require('mongoose');
const validator = require('validator');
const { validate } = require('./tourModel');
const bcrypt = require('bcryptjs');

// create schema  - name , email , photo , password , confirm password

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'enter your name'],
  },

  email: {
    type: String,
    required: [true, 'enter your email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'enter a valid eamil'],
  },

  photo: {
    type: String,
  },

  password: {
    type: String,
    required: [true, 'enter a password '],
    minlength: 8,
    select : false 
  },

  confirmpassword: {
    type: String,
    required: [true, 'enter a confirm password '],
    validate: {
      // this only works on  create , Save !!!
      validator: function (el) {
        return el === this.password;
      },
    },
    message: 'password and confirmpassword are not same ',
  },

  passwordChangedAt : Date 
});

// mongoose middleware function for encrypte
userSchema.pre('save', async function (next) {
  //only run this function if password actuallu modifed
  if (!this.isModified('password')) return next();

  //hash the password  with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  //delete confirmpassword field
  this.confirmpassword = undefined;
  next();
});




//instance method
userSchema.methods.correctPassword = async function(
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

// instance method
userSchema.methods.changePasswordAfter = function(JWTTimeStamp) {
  if(this.passwordChangedAt) {
const changedTimeStamp = parseInt(this.passwordChangedAt.getTime()/1000 , 10);

// console.log(this.passwordChangedAt , JWTTimeStamp);

return JWTTimeStamp < changedTimeStamp; //100 < 200 
  }

  // false means not changed 99999
  return false;

}

// model out of the schema
const User = mongoose.model('User', userSchema);
module.exports = User;

