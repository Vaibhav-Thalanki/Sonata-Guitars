const httpStatus = require("http-status");
const { ApiError } = require("../middleware/apiError");
const { User } = require("../models/user")
const jwt = require('jsonwebtoken')
require('dotenv').config()

const validateEmailToken = async(token)=>{
    return jwt.verify(token, process.env.SECRET)
}

const findUserByEmail = async(email) =>{
    return await User.findOne({email:email})
}

const findUserById =  async(_id) =>{
    return await User.findById(_id);
}

const updateUserProfile =  async(req) =>{
    try{
        
        const user = await User.findOneAndUpdate({_id:req.user._id},
            {
                "$set":{
                    ...req.body
                }
            },{new:true})
            //console.log(user);

        if(!user){
            throw new ApiError(httpStatus.NOT_FOUND,'User Not Found')
        }
        return user;
    }
    catch(error){
        throw error
    }
}
const updateUserEmail = async(req)=>{
    try{
        if(await User.emailTaken(req.body.newemail)){
            throw new ApiError(httpStatus.BAD_REQUEST,'Sorry email taken')
        }

        const user = await User.findOneAndUpdate({_id:req.user._id, email:req.user.email},
            {
                "$set":{
                    email: req.body.newemail,
                    verified: false
                }
            },{new:true})
        if(!user){
            throw new ApiError(httpStatus.NOT_FOUND,'User Not Found')
        }
        return user;
    }
    catch(err){
        throw err
    }
}


module.exports = {
    findUserByEmail,
    findUserById,
    updateUserProfile,
    updateUserEmail,
    validateEmailToken
}