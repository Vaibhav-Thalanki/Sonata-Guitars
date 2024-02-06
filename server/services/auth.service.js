const { User } = require("../models/user");
const httpStatus = require('http-status')
const {ApiError} = require('../middleware/apiError');
const passport = require("passport");
const userService = require('./user.service')

const createUser = async (email, password) => {
  try {
    if (await User.emailTaken(email)) {
      throw new ApiError(httpStatus.BAD_REQUEST,'Sorry, Email Taken');
    }
    const user = new User({
      email,
      password,
    });
    await user.save();
    return user;
  } catch (error) {
    throw error;
  }
};
const genAuthToken = async (user) => {
  try {
    const token = await user.generateAuthToken();
    return token;
  } catch (err) {
    console.log(err);
  }
};

const signInWithEmailAndPassword =async(email,password)=>{
  try{
    const user = await userService.findUserByEmail(email);
    if(!user){
      throw new ApiError(httpStatus.UNAUTHORIZED,'Sorry, Bad Email');
    }
    if(!(await user.comparePassword(password))){
      throw new ApiError(httpStatus.UNAUTHORIZED,'Sorry, Bad Password');
    }
    return user;

  }catch(error){
    throw error
  }
}

module.exports = {
  createUser,
  genAuthToken,signInWithEmailAndPassword
};
