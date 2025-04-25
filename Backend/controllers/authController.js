const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const asyncHandeler = require('express-async-handler');
const generateToken = require('../config/generateToken');



const registerUser = asyncHandeler(async(req,res)  => {
  const {name , email, password  } = req.body;

  if(!name || !email || !password){
   resizeBy.status(400);
   throw new Error("Please Enter all the Feilds");
  }


  const userExist = await  User.findOne({email});

  if(userExist){
   res.status(400);
   throw new Error("User already exist");
  }

  const user = await User.create({
   name,
   email,
   password,
  })

  if(user){
   res.status(201).json({
       _id: user._id,
       name:user.name,
       email:user.email,
       token:generateToken(user._id),
   })
  }else{
   res.status(400);
   throw new Error("Failed to Create new user");
  }
});



const loginUser = asyncHandeler(async (req,res) => {
       const {email , password} = req.body;

       const user = await User.findOne({email});

       if(user && (await user.matchPassword(password))){
           res.json({
               _id: user._id,
               name:user.name,
               email:user.email,
               token:generateToken(user._id),
           });
       }else {
           res.status(401);
           throw new Error("Invalid Email or Password");
         }
})

module.exports = { registerUser, loginUser };
